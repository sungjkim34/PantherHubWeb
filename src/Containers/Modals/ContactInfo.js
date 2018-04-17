import React, { Component } from 'react';
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { getContactInfo } from '../../Services/StudentService';

export default class ContactInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            contactInfo: {}
        };
    }

    componentDidMount() {
        getContactInfo(this.props.userInfo.id).then(contactInfo => {
            this.setState({contactInfo});
        });
    }

    triggerModal = () => {
        this.setState({open: !this.state.open});
    }

    render() {

        const { accountInfo, userInfo } = this.props;
        const { contactInfo } = this.state;
        console.log(contactInfo);

        return (
            <Modal
                open={this.state.open}
                onClose={this.triggerModal}>
                <Modal.Header>Contact Information</Modal.Header>
                <Modal.Content image scrolling>
                    <Image
                        size='medium'
                        src={require('../../Assets/GeorgiaStateLogo.png')}
                        wrapped />
                    <Modal.Description style={{width: '100%'}}>
                        <Header>{userInfo.firstName} {userInfo.lastName}</Header>
                        <p><span><strong>Student Since: </strong></span><span style={{float:'right'}}>{moment(userInfo.startDate).format('LL')}</span></p>
                        <p><span><strong>Date of Birth: </strong></span><span style={{float:'right'}}>{moment(userInfo.dob).format('LL')}</span></p>
                        <p><span><strong>Major: </strong></span><span style={{float:'right'}}>{userInfo.major}</span></p>
                        <p><span><strong>Address: </strong></span><span style={{float:'right'}}>{contactInfo.street}</span></p>
                        {contactInfo.street2 && <p style={{ textAlign: 'right' }}>{contactInfo.street2}</p>}
                        <p style={{ textAlign: 'right' }}>{contactInfo.city}, {contactInfo.state} {contactInfo.postalCode}</p>
                        <p><strong>Email: </strong><span style={{ float: 'right' }}>{contactInfo.email}</span></p>
                        <p><strong>Phone Number: </strong><span style={{ float: 'right' }}>{contactInfo.phoneNumber}</span></p>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                <Button primary onClick={() => this.triggerModal()}>
                    Finish <Icon name='right chevron' />
                </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}