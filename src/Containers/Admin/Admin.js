import React, {Component} from 'react';
import { Button, Card, Comment, Divider, Dropdown, Form, Grid, Header, Icon, Image, Loader, Segment } from 'semantic-ui-react';
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
                    <Header as='h2'>Admin Home</Header>
                    <Grid columns={1}>
                        <Grid.Row stretched>
                        <Grid.Column>
                            <Segment>
                                <Header as='h2'>Admin Dashboard</Header>
                                <p>Welcome to the admin panel for the PantherHub management system.</p>
                                <p>Here you have the ability to manage information at an administrator level.</p>
                                <Divider />
                                <Header as='h3'>Account</Header>
                                <p>View current registered account information such as id, username, account type, and associated person id.</p>
                                {/* <Divider /> */}
                                <Header as='h3'>Student</Header>
                                <p>Add, remove, modify students, and view current registered students' information such as id, name, date of birth, enrolled major, and enrollment/start date.</p>
                                {/* <Divider /> */}
                                <Header as='h3'>Professor</Header>
                                <p>Add, remove, modify professors, and view current registered professors' information such as id, name, date of birth, and department id.</p>
                                {/* <Divider /> */}
                                <Header as='h3'>Course</Header>
                                <p>Add, remove, modify courses, and view current courses' information such as id, name, department id, credits, and subject.</p>
                                {/* <Divider /> */}
                                <Header as='h3'>Class</Header>
                                <p>Add, remove, modify classes, and view current classes' information such as id, course id, time, class days, max numbef of students, professor id, and location.</p>
                            </Segment>
                        </Grid.Column>
                        </Grid.Row>
                    </Grid>
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