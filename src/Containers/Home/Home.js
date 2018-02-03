import React, {Component} from 'react';
import { authUser } from '../../Services/AuthService';
import { Button, Form, Header, Image } from 'semantic-ui-react';
import './Home.css';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: ''
        };
    }

    authUser = () => {
        this.setState({error: ''});
        authUser(this.state.username, this.state.password)
            .then(res => {
                if (res.length === 0) {
                    this.setState({error: 'Wrong credentials.'});
                } else {
                    console.log('successfully logged in');
                    console.log(res);
                }
            });
    }

    render() {
        return (
            <div className="home-container">
                <Image src={require('../../Assets/GeorgiaStateLogo.png')} size='medium' />
                <Header as='h2'>PantherHub</Header>
                <p>{this.state.error}</p>
                <Form>
                    <Form.Group>
                        <Form.Input placeholder='Username' value={this.state.username} onChange={(event, data) => this.setState({username: data.value})}/>
                        <Form.Input placeholder='Password' value={this.state.password} onChange={(event, data) => this.setState({password: data.value})}/>
                        <Button onClick={() => this.authUser()} content='Login'/>
                    </Form.Group>
                </Form>
            </div>
        );
    }
}