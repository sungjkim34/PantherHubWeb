import React, { Component } from 'react';
import { Button, Header, Form, Label, Icon, Image, Input, Modal, Segment, Step } from 'semantic-ui-react';
// import { Link } from 'react-router-dom';
import moment from 'moment';
import { COST_STUDENT_FEE, COST_PER_CREDIT } from '../../const';

import { addTransaction } from '../../Services/TransactionService';

const PaymentStep = ({ stepNumber }) => {
    return (
        <Step.Group size='tiny'>
            <Step active={stepNumber === 1}>
                <Icon name='dollar' />
                <Step.Content>
                    <Step.Title>Classes</Step.Title>
                    <Step.Description>Registered classes</Step.Description>
                </Step.Content>
            </Step>

            <Step active={stepNumber === 2}>
                <Icon name='payment' />
                <Step.Content>
                    <Step.Title>Billing</Step.Title>
                    <Step.Description>Enter billing info</Step.Description>
                </Step.Content>
            </Step>

            <Step active={stepNumber === 3}>
                <Icon name='info circle' />
                <Step.Content>
                    <Step.Title>Confirm Payment</Step.Title>
                </Step.Content>
            </Step>
        </Step.Group>
    );
}

export default class Payment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            stepNumber: 1,
            firstName: '',
            lastName: '',
            street: '',
            street2: '',
            city: '',
            state: '',
            zipCode: '',
            email: '',
            amountToPay: 0,
            totalDue: 0
        };
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({ totalDue: nextProps.totalDue });
    }

    clearBillingInfo = () => {
        this.setState({ firstName: '', lastName: '', street: '', street2: '', city: '', state: '', zipCode: '', email: '' });
    }

    triggerModal = () => {
        this.setState({ stepNumber: 1, open: !this.state.open });
        this.clearBillingInfo();
    }

    nextStep = () => {
        if (this.state.stepNumber < 3) {
            this.setState({ stepNumber: this.state.stepNumber + 1 });
        }
    }

    confirmPayment = () => {
        const { amountToPay } = this.state;
        addTransaction(this.props.userInfo.id, amountToPay).then(res => {
            this.setState({ stepNumber: 1, open: !this.state.open, amountToPay: 0 });
            this.props.payTuition(amountToPay);
            this.clearBillingInfo();
        });
    }
    
    checkIfBillingInfoValid = () => {
        const { firstName, lastName, street, street2, city, state, zipCode, email } = this.state;
        return(!!(firstName.length && lastName.length && street.length && city.length && state.length && zipCode.length && email.length));
    }

    enterAmountToPay = (amountToPay) => {
        this.setState({amountToPay, totalDue: this.props.totalDue - amountToPay});
    }

    checkIfAmountIsValid = () => {

        const { amountToPay } = this.state;
        
        const isNan = isNaN(parseFloat(Math.round(amountToPay * 100) / 100).toFixed(2));
        const amountIsLessThanTotalDue = parseFloat(Math.round(amountToPay * 100) / 100) <= parseFloat(Math.round(this.props.totalDue * 100) / 100);
        const amountToPayIsGreaterThanZero = parseFloat(Math.round(amountToPay * 100) / 100) > 0;

        return(!isNan && amountIsLessThanTotalDue && amountToPayIsGreaterThanZero);
    }

    __returnModalDescription = () => {

        const { /*accountInfo,*/ userInfo, enrolledClasses } = this.props;
        const { stepNumber, amountToPay, totalDue } = this.state;

        switch (stepNumber) {
            case 1:
                return (
                    <Modal.Description style={{ width: '100%' }}>
                        <Header>{userInfo.firstName} {userInfo.lastName}</Header>
                        {/* <span><strong>Current Major: </strong></span><span style={{float:'right'}}>{userInfo.major}</span> */}
                        <p><strong>Enrolled Classes: </strong></p>
                        {
                            enrolledClasses.map((enrolledClass, i) =>
                                <Segment key={i}>
                                    <p>
                                        <span><strong>{enrolledClass.name} ({enrolledClass.credits} credits)</strong></span>
                                        <span style={{ float: 'right' }}>{enrolledClass.location}</span>
                                    </p>
                                    <p>
                                        <span>{enrolledClass.professorFirstName} {enrolledClass.professorLastName}</span>
                                        <span style={{ float: 'right' }}>{moment(enrolledClass.startTime, 'HH:mm').format('hh:mma')}-{moment(enrolledClass.endTime, 'HH:mm').format('hh:mma')}</span>
                                    </p>
                                </Segment>
                            )
                        }
                        <p><span>Student Fees:</span><span style={{ float: 'right' }}>${parseFloat(Math.round(COST_STUDENT_FEE * 100) / 100).toFixed(2)}</span></p>
                        <p><span>Class Fees:</span><span style={{ float: 'right' }}>${parseFloat(Math.round(COST_PER_CREDIT * 100) / 100).toFixed(2)} x {enrolledClasses.reduce((a, b) => +a + +b.credits, 0)} credits</span></p>
                        <span><strong>Total Due: </strong></span><span style={{ float: 'right' }}>${parseFloat(Math.round(totalDue * 100) / 100).toFixed(2)}</span>
                        <PaymentStep stepNumber={stepNumber} />
                    </Modal.Description>
                );
            case 2:
                return (
                    <Modal.Description style={{ width: '100%' }}>
                        <p><strong>Billing Information: </strong></p>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Input fluid label='First name' placeholder='Please enter your first name' onChange={(event, data) => this.setState({ firstName: data.value })} />
                                <Form.Input fluid label='Last name' placeholder='Please enter your last name' onChange={(event, data) => this.setState({ lastName: data.value })} />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Input fluid label='Street address' placeholder='Please enter your street address' onChange={(event, data) => this.setState({ street: data.value })} />
                                <Form.Input fluid label='Street address 2 (optional)' placeholder='Please enter your street address 2' onChange={(event, data) => this.setState({ street2: data.value })} />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Input fluid label='City' placeholder='Please enter your city' onChange={(event, data) => this.setState({ city: data.value })} />
                                <Form.Dropdown fluid selection label='State' placeholder='State' options={[{ text: 'GA', value: 'GA' }]} onChange={(event, data) => this.setState({ state: data.value })} />
                                <Form.Input fluid label='Zip code' placeholder='Please enter your zip' onChange={(event, data) => this.setState({ zipCode: data.value })} />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Input fluid label='Email' placeholder='Please enter your email' onChange={(event, data) => this.setState({ email: data.value })} />
                            </Form.Group>
                        </Form>
                        <PaymentStep stepNumber={stepNumber} />
                    </Modal.Description>
                );
            case 3:
                return (
                    <Modal.Description style={{ width: '100%' }}>
                        <Header>{userInfo.firstName} {userInfo.lastName}</Header>
                        <p><strong>Confirm Payment: </strong></p>
                        <p><span>Name: </span><span style={{ float: 'right' }}>{this.state.firstName} {this.state.lastName}</span></p>
                        <p><span>Address: </span><span style={{ float: 'right' }}>{this.state.street}</span></p>
                        {this.state.street2 && <p style={{ textAlign: 'right' }}>{this.state.street2}</p>}
                        <p style={{ textAlign: 'right' }}>{this.state.city}, {this.state.state} {this.state.zipCode}</p>
                        <p><span>Email: </span><span style={{ float: 'right' }}>{this.state.email}</span></p>
                        <br />
                        <div style={{float: 'right'}}>
                            <Input labelPosition='right' type='text' placeholder='Amount' value={amountToPay} onChange={(event, data) => this.enterAmountToPay(data.value)}>
                                <Label basic>$</Label>
                                <input style={{textAlign: 'right'}}/>
                            </Input>
                        </div>
                        <br />
                        <br />
                        <br />
                        <br />
                        <p><span><strong>Total: </strong></span><span style={{ float: 'right' }}>${parseFloat(Math.round(this.props.totalDue * 100) / 100).toFixed(2)}</span></p>
                        <p><span><strong>Remainding Total: </strong></span><span style={{ float: 'right' }}>${parseFloat(Math.round(totalDue * 100) / 100).toFixed(2)}</span></p>
                        <PaymentStep stepNumber={stepNumber} />
                    </Modal.Description>
                );
        }
    }

    render() {

        const { /*accountInfo,*/ userInfo, enrolledClasses, totalDue } = this.props;
        const { stepNumber } = this.state;
        // console.log(enrolledClasses);

        return (
            <Modal
                open={this.state.open}
                onClose={this.triggerModal}
                closeIcon
                trigger={<Button style={{ marginTop: '10px' }} disabled={totalDue === 0} onClick={() => this.triggerModal()} content='Pay Account' fluid primary />}>
                <Modal.Header>Pay Account</Modal.Header>
                <Modal.Content image scrolling>
                    <Image
                        size='medium'
                        src={require('../../Assets/GeorgiaStateLogo.png')}
                        wrapped
                    />
                    {this.__returnModalDescription()}
                </Modal.Content>
                <Modal.Actions>
                    {
                        stepNumber === 1 &&
                        <Button primary onClick={() => this.nextStep()}>Billing <Icon name='payment' style={{ marginLeft: 5 }} /></Button>
                    }
                    {
                        stepNumber === 2 &&
                        <Button primary onClick={() => this.nextStep()} disabled={!this.checkIfBillingInfoValid()}>Confirm <Icon name='info circle' style={{ marginLeft: 5 }} /></Button>
                    }
                    {
                        stepNumber === 3 &&
                        <Button primary onClick={() => this.confirmPayment()} disabled={!this.checkIfAmountIsValid()}>Finish <Icon name='chevron right' style={{ marginLeft: 5 }} /></Button>
                    }
                </Modal.Actions>
            </Modal>
        );
    }
}