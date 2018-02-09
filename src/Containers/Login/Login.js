import React, {Component} from 'react';
import { authUser } from '../../Services/AuthService';
import { Button, Form, Header, Image } from 'semantic-ui-react';
import './Login.css';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: ''
        };
    }

    componentWillMount() {
        if(this.props.isLoggedIn) {
            this.props.history.push('/');
        }
    }

    authUser = () => {
        this.setState({error: ''});
        authUser(this.state.username, this.state.password)
            .then(accountInfo => {
                if (accountInfo.length === 0) {
                    this.setState({error: 'Error - Invalid Credentials.'});
                } else {
                    this.props.login(accountInfo);
                    this.props.history.push('/');
                }
            });
    }

    render() {
        return (
            <div className='login-container'>
                <div className='login-header'>
                <Image src={require('../../Assets/GeorgiaStateFlatLogo.png')} size='large' />
                <Header as='h2'>Please log in.</Header>
                <Header as='h4'>By logging into this system, you agree to comply with university policies. </Header>
                <p>When finished, log out and close your browser to end your session. </p>
                <div className='error-message'>
                    <p>{this.state.error}</p>
                </div>
                </div>
                <Form>
                    <Form.Group>
                        <Form.Input label='CampusID Username' placeholder='Username' width={6} value={this.state.username} onChange={(event, data) => this.setState({username: data.value})}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Input label='Password' placeholder='Password' type='password' width={6} value={this.state.password} onChange={(event, data) => this.setState({password: data.value})}/>
                    </Form.Group>
                    <Form.Group>
                        <div className='login-button'>
                            <Button onClick={() => this.authUser()} content='Login' fluid primary/>
                        </div>
                    </Form.Group>
                </Form>
            </div>
        );
    }
}