import React, {Component} from 'react';
import { getUserInfo } from '../../Services/UserService';
import { logOutUser } from '../../Services/AuthService';
import { Button, Form, Header, Image } from 'semantic-ui-react';
import './Home.css';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: {}
        };
        if(!this.props.accountInfo) {
            this.props.history.push('/login')
        } else {
            getUserInfo(this.props.accountInfo).then(userInfo => {
                this.setState({userInfo: userInfo});
            });
        }
    }

    logout() {
        logOutUser();
        this.props.history.push('/login')
    }

    render() {
        return (
            <div className="home-container">
                <Image src={require('../../Assets/GeorgiaStateLogo.png')} size='medium' />
                <Header as='h2'>PantherHub</Header>
                { this.state.userInfo && <div>Welcome {this.state.userInfo.firstName}</div> }
                <Button onClick={() => this.logout()} content='Logout' secondary/>
            </div>
        );
    }
}