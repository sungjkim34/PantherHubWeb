import React, { Component } from 'react';
import { Button, Header, Form, Icon, Image, Modal } from 'semantic-ui-react';
// import { Link } from 'react-router-dom';
import moment from 'moment';

import { getContactInfo, updateContactInfo } from '../../Services/StudentService';

export default class ContactInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            contactInfo: {},
            isEditing: false,
            street: '',
            street2: '',
            city: '',
            state: '',
            postalCode: '',
            phoneNumber: '',
            email: '',
        };
    }

    componentDidMount() {
        getContactInfo(this.props.userInfo.id).then(contactInfo => {
            console.log(contactInfo);
            this.setState({ contactInfo });
            !Array.isArray(contactInfo) &&
                this.setState({
                    street: contactInfo.street,
                    street2: contactInfo.street2 ? contactInfo.street2 : '',
                    city: contactInfo.city,
                    state: contactInfo.state,
                    postalCode: contactInfo.postalCode,
                    phoneNumber: contactInfo.phoneNumber,
                    email: contactInfo.email
                });
        });
    }

    triggerModal = () => {
        this.setState({ open: !this.state.open });
    }

    toggleEdit = () => {
        this.setState({ isEditing: !this.state.isEditing });
    }

    checkIfContactInfoValid = () => {
        const { street, city, state, postalCode, phoneNumber, email } = this.state;
        return(!!(street.length && city.length && state.length && postalCode.toString().length && phoneNumber.length && email.length));
    }

    saveContactInfo = () => {
        const { street, street2, city, state, postalCode, phoneNumber, email } = this.state;
        const { id: studentId } = this.props.userInfo;
        const contactInfo = { studentId, street, street2, city, state, postalCode, phoneNumber, email };
        updateContactInfo(contactInfo).then(res => {
            this.setState({ isEditing: false, contactInfo });
        });
    }

    render() {

        const { userInfo } = this.props;
        const { contactInfo, isEditing, street, street2, city, state, postalCode, phoneNumber, email } = this.state;

        return (
            <Modal
                open={this.state.open}
                onClose={this.triggerModal}>
                <Modal.Header>{isEditing ? 'Contact Information' : 'Edit Information'}</Modal.Header>
                <Modal.Content image scrolling>
                    <Image
                        size='medium'
                        src={require('../../Assets/GeorgiaStateLogo.png')}
                        wrapped />
                    <Modal.Description style={{ width: '100%' }}>
                        <Header>{userInfo.firstName} {userInfo.lastName}<span style={{ float: 'right' }}><Icon link size='large' name='edit' onClick={() => this.toggleEdit()} /></span></Header>
                        {
                            isEditing ?
                                <Form>
                                    <Form.Group widths='equal'>
                                        <Form.Input fluid label='Street address' placeholder='Please enter your street address' value={street} onChange={(event, data) => this.setState({ street: data.value })} />
                                        <Form.Input fluid label='Street address 2 (optional)' placeholder='Please enter your street address 2' value={street2} onChange={(event, data) => this.setState({ street2: data.value })} />
                                    </Form.Group>
                                    <Form.Group widths='equal'>
                                        <Form.Input fluid label='City' placeholder='Please enter your city' value={city} onChange={(event, data) => this.setState({ city: data.value })} />
                                        <Form.Dropdown fluid selection label='State' placeholder='State' value={state} options={[{ text: 'GA', value: 'GA' }]} onChange={(event, data) => this.setState({ state: data.value })} />
                                        <Form.Input fluid label='Zip code' placeholder='Please enter your zip' value={postalCode} onChange={(event, data) => this.setState({ postalCode: data.value })} />
                                    </Form.Group>
                                    <Form.Group widths='equal'>
                                        <Form.Input fluid label='Email' placeholder='Please enter your email' value={email} onChange={(event, data) => this.setState({ email: data.value })} />
                                        <Form.Input fluid label='Phone Number' placeholder='Please enter your phone number' value={phoneNumber} onChange={(event, data) => this.setState({ phoneNumber: data.value })} />
                                    </Form.Group>
                                </Form> :
                                <div>
                                    <p><span><strong>Student Since: </strong></span><span style={{ float: 'right' }}>{moment(userInfo.startDate).format('LL')}</span></p>
                                    <p><span><strong>Date of Birth: </strong></span><span style={{ float: 'right' }}>{moment(userInfo.dob).format('LL')}</span></p>
                                    <p><span><strong>Major: </strong></span><span style={{ float: 'right' }}>{userInfo.major}</span></p>
                                    <p><span><strong>Address: </strong></span><span style={{ float: 'right' }}>{contactInfo.street}</span></p>
                                    {contactInfo.street2 && <p style={{ textAlign: 'right' }}>{contactInfo.street2}</p>}
                                    <p style={{ textAlign: 'right' }}>{contactInfo.city}{contactInfo.state && ','} {contactInfo.state} {contactInfo.postalCode}</p>
                                    <p><strong>Email: </strong><span style={{ float: 'right' }}>{contactInfo.email}</span></p>
                                    <p><strong>Phone Number: </strong><span style={{ float: 'right' }}>{contactInfo.phoneNumber}</span></p>
                                </div>
                        }
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    {
                        isEditing ?
                            <Button color='teal' disabled={!this.checkIfContactInfoValid()} onClick={() => this.saveContactInfo()}>
                                Save <Icon name='save' style={{marginLeft: 5}} />
                            </Button> :
                            <Button primary onClick={() => this.triggerModal()}>
                                Finish <Icon name='right chevron' />
                            </Button>
                    }
                </Modal.Actions>
            </Modal>
        );
    }
}