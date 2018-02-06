import React, {Component} from 'react';
import { Button, Comment, Dropdown, Form, Header, Icon, Image, Loader, Tab } from 'semantic-ui-react';
import { Redirect, Link } from 'react-router-dom';
import { addStudent } from '../../Services/StudentService';
import { addProfessor } from '../../Services/ProfessorService';
import { checkUsername } from '../../Services/UserService';
import './Admin.css';
import AdminMenu from './AdminMenu';
import moment from 'moment';
import { MAJOR_OPTIONS, DEPARTMENT_OPTIONS } from '../../const';;

export default class Users extends Component {

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
            professor: {
                firstName: '',
                lastName: '',
                departmentId: undefined,
                dob: '',
                username: '',
                password: ''
            },
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

    // Todo: merge student and professor if possible
    enterProfessorUsername = (username) => {
        this.setState({professor: {...this.state.professor, username}});
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

    addProfessor = () => {
        console.log(this.state.professor);
        // addProfessor(this.state.professor).then(res => {
        //     this.setState({
        //         professor: {...this.state.student, firstName: '', lastName: '', dob: '', departmentId: undefined, username: '', password: ''},
        //         usernameExists: false
        //     });
        //     console.log(res);
        // });
    }

    renderAddStudent() {
        return (
            <Tab.Pane>
                <Header as='h3'>Add Student</Header>
                    <Form>
                        <Form.Group>
                            <Form.Input label='First Name' placeholder='Enter first name' value={this.state.student.firstName} onChange={(event, data) => this.setState({student: {...this.state.student, firstName: data.value}})} width={8} />
                            <Form.Input label='Last Name' placeholder='Enter last name' value={this.state.student.lastName} onChange={(event, data) => this.setState({student: {...this.state.student, lastName: data.value}})} width={8} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Input label='Username' error={this.state.usernameExists} placeholder='Enter username' value={this.state.student.username} onChange={(event, data) => this.enterUsername(data.value)} width={8} />
                            <Form.Input label='Password' placeholder='Enter password' value={this.state.student.password} onChange={(event, data) => this.setState({student: {...this.state.student, password: data.value}})} width={8} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Input label='Date of Birth' type='date' value={this.state.student.dob} onChange={(event, data) => this.setState({student: {...this.state.student, dob: data.value}})} width={3} />
                            <Form.Input label='Start Date' type='date' value={this.state.student.startDate} onChange={(event, data) => this.setState({student: {...this.state.student, startDate: data.value}})} width={3} />
                            <Form.Dropdown label='Major' placeholder='Select Major' onChange={(event, data) => this.setState({student: {...this.state.student, major: data.value}})} selection options={MAJOR_OPTIONS}/>
                        </Form.Group>
                        <Button disabled={!this.isFormValid()} onClick={() => this.addStudent()} icon='add user' content='Add'/>
                    </Form>
            </Tab.Pane>
        );
    }

    renderAddProfessor() {
        return (
            <Tab.Pane>
                <Header as='h3'>Add Professor</Header>
                    <Form>
                        <Form.Group>
                            <Form.Input label='First Name' placeholder='Enter first name' value={this.state.professor.firstName} onChange={(event, data) => this.setState({professor: {...this.state.professor, firstName: data.value}})} width={8} />
                            <Form.Input label='Last Name' placeholder='Enter last name' value={this.state.professor.lastName} onChange={(event, data) => this.setState({professor: {...this.state.professor, lastName: data.value}})} width={8} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Input label='Username' error={this.state.usernameExists} placeholder='Enter username' value={this.state.professor.username} onChange={(event, data) => this.enterProfessorUsername(data.value)} width={8} />
                            <Form.Input label='Password' placeholder='Enter password' value={this.state.professor.password} onChange={(event, data) => this.setState({professor: {...this.state.professor, password: data.value}})} width={8} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Input label='Date of Birth' type='date' value={this.state.professor.dob} onChange={(event, data) => this.setState({professor: {...this.state.professor, dob: data.value}})} width={3} />
                            <Form.Dropdown label='Department' placeholder='Select Department' onChange={(event, data) => this.setState({professor: {...this.state.professor, departmentId: data.value}})} selection options={DEPARTMENT_OPTIONS}/>
                        </Form.Group>
                        {/* <Button disabled={!this.isFormValid()} onClick={() => this.addProfessor()} icon='add user' content='Add'/> */}
                        <Button onClick={() => this.addProfessor()} icon='add user' content='Add'/>
                    </Form>
            </Tab.Pane>
        );
    }

    renderPage() {

        const { logout, userInfo } = this.props;

        const panes = [
            { menuItem: 'Student', render: () => this.renderAddStudent() },
            { menuItem: 'Professor', render: () => this.renderAddProfessor() }
        ];

        return (
            <div className='admin-page'>
                <AdminMenu activeItem='users' userInfo={userInfo} logout={logout}/>
                <div className='admin-container'>
                    <Tab panes={panes} />
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