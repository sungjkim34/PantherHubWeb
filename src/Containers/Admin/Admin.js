import React, {Component} from 'react';
import { Button, Comment, Form, Header, Icon, Image, Loader, Menu } from 'semantic-ui-react';
import { Redirect, Link } from 'react-router-dom';
import { addStudent } from '../../Services/StudentService';
import { checkUsername } from '../../Services/UserService';
import './Admin.css';
import MainMenu from '../MainMenu/MainMenu';
import moment from 'moment';

export default class Admin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            studentFirstName: '',
            studentLastName: '',
            studentMajor: '',
            studentDob: '',
            studentStartDate: '',
            studentUsername: '',
            studentPassword: '',
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

    componentDidMount() {
    }
    
    enterUsername = (username) => {
        this.setState({studentUsername: username});
        if(username.replace(/ /g, '') !== ''){
            checkUsername(username).then(res => {
                this.setState({usernameExists: res});
            });
        }
    }

    isFormValid() {
        if (this.state.studentFirstName.replace(/ /g, '') === '' ||
            this.state.studentLastName.replace(/ /g, '') === '' ||
            this.state.studentMajor.replace(/ /g, '') === '' ||
            this.state.studentUsername.replace(/ /g, '') === '' ||
            this.state.studentPassword.replace(/ /g, '') === '' ||
            this.state.studentStartDate.replace(/ /g, '') === '' ||
            this.state.studentDob.replace(/ /g, '') === '' ||
            this.state.usernameExists) {
            return false
        }
        return true;
    }

    addStudent = () => {
        const student = {
            firstName: this.state.studentFirstName,
            lastName: this.state.studentLastName,
            major: this.state.studentMajor,
            dob: moment(this.state.studentDob).format('YYYY-MM-DD'),
            startDate: moment(this.state.studentStartDate).format('YYYY-MM-DD'),
            username: this.state.studentUsername,
            password: this.state.studentPassword,
        }
        addStudent(student).then(res => console.log(res));
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
                <div className='admin-container'>
                    <Header as='h3'>Add Student</Header>
                    <Form>
                        <Form.Group>
                            <Form.Input label='First Name' placeholder='Enter first name' value={this.state.studentFirstName} onChange={(event, data) => this.setState({studentFirstName: data.value})} width={8} />
                            <Form.Input label='Last Name' placeholder='Enter last name' value={this.state.studentLastName} onChange={(event, data) => this.setState({studentLastName: data.value})} width={8} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Input label='Username' error={this.state.usernameExists} placeholder='Enter username' value={this.state.studentUsername} onChange={(event, data) => this.enterUsername(data.value)} width={8} />
                            <Form.Input label='Password' placeholder='Enter password' value={this.state.studentPassword} onChange={(event, data) => this.setState({studentPassword: data.value})} width={8} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Input label='Date of Birth' type='date' value={this.state.studentDob} onChange={(event, data) => this.setState({studentDob: data.value})} width={3} />
                            <Form.Input label='Start Date' type='date' value={this.state.studentStartDate} onChange={(event, data) => this.setState({studentStartDate: data.value})} width={3} />
                            <Form.Dropdown label='Major' placeholder='Select Major' onChange={(event, data) => this.setState({studentMajor: data.value})} selection options={this.state.majorOptions}/>
                        </Form.Group>
                        <Button disabled={!this.isFormValid()} onClick={() => this.addStudent()} icon='add user' content='Add'/>
                    </Form>
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