import React, {Component} from 'react';
import { Button, Form, Header, Icon, Image, Modal } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
// import './Evaluation.css';

export default class Evaluation extends Component {

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
        return (
            <Modal
                open={this.state.open}
                onClose={this.triggerModal}
                trigger={<Link to='#' onClick={() => this.triggerModal()}>Academic Evaluation</Link>}>
                <Modal.Header>Academic Evaluation</Modal.Header>
                <Modal.Content image scrolling>
                    <Image
                        size='medium'
                        src={require('../../Assets/GeorgiaStateLogo.png')}
                        wrapped
                    />

                    <Modal.Description>
                        <Header>Firstname Lastname (todo)</Header>
                        <p>Academic Evaluation</p>
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