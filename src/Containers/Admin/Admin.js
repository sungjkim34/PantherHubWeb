import React, {Component} from 'react';
import { Button, Comment, Dropdown, Form, Header, Icon, Image, Loader } from 'semantic-ui-react';
import { Redirect, Link } from 'react-router-dom';
import './Admin.css';
import AdminMenu from './AdminMenu';
import moment from 'moment';

export default class Admin extends Component {

    renderPage() {
        
        const { accountInfo, userInfo, logout } = this.props;

        return (
            <div className='admin-page'>
                <AdminMenu activeItem='admin' userInfo={userInfo} logout={logout}/>
                <div className='admin-container'>
                    <Header as='h3'>Admin Panel</Header>
                    <p>Todo: Figure out text to put here</p>
                </div>
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