import React, {Component} from 'react';
import { Button, Header, Icon, Image, Modal, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { COST_STUDENT_FEE, COST_PER_CREDIT } from '../../const';

export default class Payment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    triggerModal = () => {
        this.setState({open: !this.state.open});
    }

    render() {

        const { accountInfo, userInfo, enrolledClasses, totalDue } = this.props;
        console.log(enrolledClasses);

        return (
            <Modal
                open={this.state.open}
                onClose={this.triggerModal}
                trigger={<Button style={{marginTop:'10px'}} onClick={() => this.triggerModal()} content='Pay Account' fluid primary/>}>
                <Modal.Header>Pay Account</Modal.Header>
                <Modal.Content image scrolling>
                    <Image
                        size='medium'
                        src={require('../../Assets/GeorgiaStateLogo.png')}
                        wrapped
                    />
                    <Modal.Description style={{width:'100%'}}>
                        <Header>{userInfo.firstName} {userInfo.lastName}</Header>
                        {/* <span><strong>Current Major: </strong></span><span style={{float:'right'}}>{userInfo.major}</span> */}
                        <p><strong>Enrolled Classes: </strong></p>
                        {
                            enrolledClasses.map(enrolledClass => 
                                <Segment>
                                    <p>
                                        <span><strong>{enrolledClass.name} ({enrolledClass.credits} credits)</strong></span>
                                        <span style={{float:'right'}}>{enrolledClass.location}</span>
                                    </p>
                                    <p>
                                        <span>{enrolledClass.professorFirstName} {enrolledClass.professorLastName}</span>
                                        <span style={{float:'right'}}>{moment(enrolledClass.startTime, 'HH:mm').format('hh:mma')}-{moment(enrolledClass.endTime, 'HH:mm').format('hh:mma')}</span>
                                    </p>
                                </Segment>
                            )
                        }
                        <p><span>Student Fees:</span><span style={{float:'right'}}>${COST_STUDENT_FEE}.00</span></p>
                        <p><span>Class Fees:</span><span style={{float:'right'}}>${COST_PER_CREDIT}.00 x {enrolledClasses.reduce((a, b) => +a + +b.credits, 0)} credits</span></p>
                        <span><strong>Total Due: </strong></span><span style={{float:'right'}}>${totalDue}.00</span>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                <Button primary onClick={() => this.triggerModal()}>
                    Pay <Icon name='payment' style={{marginLeft: 5}}/>
                </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}