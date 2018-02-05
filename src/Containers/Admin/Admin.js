import React, {Component} from 'react';
import { Button, Comment, Form, Header, Icon, Image, Loader, Menu } from 'semantic-ui-react';
import { Redirect, Link } from 'react-router-dom';
import './Admin.css';
import MainMenu from '../MainMenu/MainMenu';
import { serverURL } from '../../env';
import moment from 'moment';

export default class Admin extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
    }

    renderMenu() {

        const { logout, userInfo } = this.props;
        
        return (
            <Menu stackable borderless className='menu-bar'>
                <Menu.Item>
                    <Image src={require('../../Assets/GeorgiaStateFlatLogo.png')} size='medium' />
                </Menu.Item>
                <Menu.Item active as={Link} to='/admin'>Home</Menu.Item>
                <Menu.Item position='right'>
                    <span style={{marginRight: '10px'}}><Icon name='user' />{userInfo.firstName}</span>
                    <Button onClick={() => logout()} content='Logout' secondary/>
                </Menu.Item>
            </Menu>
        );
    }

    renderPage() {
        const { accountInfo, userInfo } = this.props;

        return (
            <div className='admin-page'>
                {this.renderMenu()}
            </div>
        );
    }

    render() {

        const { isLoggedIn, userInfo, accountInfo } = this.props;

        return (
            userInfo ? accountInfo.accountType === 'admin' ? this.renderPage() : <Redirect to='/' /> :
            isLoggedIn ? <div><Loader active size='massive'>Loading</Loader></div> : <Redirect to='/login' />
        );
    }
}