import React, {Component} from 'react';
import { Button, Comment, Dropdown, Form, Header, Icon, Image, Loader, Menu } from 'semantic-ui-react';
import { Redirect, Link } from 'react-router-dom';
import { addStudent } from '../../Services/StudentService';
import { checkUsername } from '../../Services/UserService';
import './Admin.css';
import AdminMenu from './AdminMenu';
import moment from 'moment';

export default class Admin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            student: {
                firstName: '',
                lastName: '',
                major: '',
                dob: '',
                startDate: '',
                username: '',
                password: ''
            },
            majorOptions: [
                {
                    text: 'Biology',
                    value: 'Biology'
                },
                {
                    text: 'Computer Science',
                    value: 'Computer Science'
                },
                {
                    text: 'History',
                    value: 'History'
                },
                {
                    text: 'Mathematics',
                    value: 'Mathematics'
                }
            ],
            usernameExists: false
        };
    }

    enterUsername = (username) => {
        this.setState({student: {...this.state.student, username}});
        if(username.replace(/ /g, '') !== ''){
            checkUsername(username).then(res => {
                this.setState({usernameExists: res});
            });
        }
    }

    isFormValid() {
        if ((this.state.student.firstName.replace(/ /g, '') === '') ||
            (this.state.student.lastName.replace(/ /g, '') === '') ||
            (this.state.student.major.replace(/ /g, '') === '') ||
            (this.state.student.username.replace(/ /g, '') === '') ||
            (this.state.student.password.replace(/ /g, '') === '') ||
            (!moment(this.state.student.dob, 'YYYY-MM-DD', true).isValid()) ||
            (!moment(this.state.student.startDate, 'YYYY-MM-DD', true).isValid()) ||
            (this.state.usernameExists)) {
            return false
        }
        return true;
    }

    addStudent = () => {
        addStudent(this.state.student).then(res => {
            this.setState({
                student: {...this.state.student, firstName: '', lastName: '', major: '', dob: '', startDate: '', username: '', password: ''},
                usernameExists: false
            });
            console.log(res);
        });
    }

    renderPage() {
        
        const { accountInfo, userInfo, logout } = this.props;

        return (
            <div className='admin-page'>
                {/* {this.renderMenu()} */}
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