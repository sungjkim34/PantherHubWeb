import React, {Component} from 'react';
import { Button, Comment, Dropdown, Form, Header, Icon, Image, Loader, Tab, Table } from 'semantic-ui-react';
import { Redirect, Link } from 'react-router-dom';
import { addStudent, getAllStudents } from '../../Services/StudentService';
import { addProfessor, getAllProfessors } from '../../Services/ProfessorService';
import { checkUsername } from '../../Services/UserService';
import './Admin.css';
import AdminMenu from './AdminMenu';
import moment from 'moment';
import { MAJOR_OPTIONS, DEPARTMENT_OPTIONS } from '../../const';;

export default class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            students: [],
            professors: [],
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
            course: {
                name: '',
                departmentId: undefined,
                credits: '',
                subject: ''
            },
            usernameExists: false
        };
    }

    componentDidMount() {
        getAllStudents().then(res => {
            this.setState({students: res});
        });
        getAllProfessors().then(res => {
            this.setState({professors: res});
        });
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
        addProfessor(this.state.professor).then(res => {
            this.setState({
                professor: {...this.state.student, firstName: '', lastName: '', dob: '', departmentId: undefined, username: '', password: ''},
                usernameExists: false
            });
            console.log(res);
        });
    }

    addCourse = () => {
        console.log(this.state.course);
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
                <Table celled selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>First Name</Table.HeaderCell>
                            <Table.HeaderCell>Last Name</Table.HeaderCell>
                            <Table.HeaderCell>DOB</Table.HeaderCell>
                            <Table.HeaderCell>Major</Table.HeaderCell>
                            <Table.HeaderCell>Start Date</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            this.state.students.map((student, i) => {
                                return (
                                    <Table.Row key={i}>
                                        <Table.Cell>{student.id}</Table.Cell>
                                        <Table.Cell>{student.firstName}</Table.Cell>
                                        <Table.Cell>{student.lastName}</Table.Cell>
                                        <Table.Cell>{moment(student.dob,).format('MM-DD-YYYY')}</Table.Cell>
                                        <Table.Cell>{student.major}</Table.Cell>
                                        <Table.Cell>{moment(student.startDate).format('MM-DD-YYYY')}</Table.Cell>
                                    </Table.Row>
                                );
                            })
                        }
                    </Table.Body>
                </Table>
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
                <Table celled selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>First Name</Table.HeaderCell>
                            <Table.HeaderCell>Last Name</Table.HeaderCell>
                            <Table.HeaderCell>DOB</Table.HeaderCell>
                            <Table.HeaderCell>Department ID</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            this.state.professors.map((professor, i) => {
                                return (
                                    <Table.Row key={i}>
                                        <Table.Cell>{professor.id}</Table.Cell>
                                        <Table.Cell>{professor.firstName}</Table.Cell>
                                        <Table.Cell>{professor.lastName}</Table.Cell>
                                        <Table.Cell>{moment(professor.dob).format('MM-DD-YYYY')}</Table.Cell>
                                        <Table.Cell>{professor.departmentId}</Table.Cell>
                                    </Table.Row>
                                );
                            })
                        }
                    </Table.Body>
                </Table>
            </Tab.Pane>
        );
    }

    renderAddCourse() {
        return (
            <Tab.Pane>
                <Header as='h3'>Add Course</Header>
                    <Form>
                        <Form.Group>
                            <Form.Input label='Course Name' placeholder='Enter course name' value={this.state.course.name} onChange={(event, data) => this.setState({course: {...this.state.course, name: data.value}})} width={8} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Input label='Credits' placeholder='Enter number of credits' value={this.state.course.credits} onChange={(event, data) => this.setState({course: {...this.state.course, credits: data.value}})} width={8} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Input label='Subject' placeholder='Enter subject' value={this.state.course.subject} onChange={(event, data) => this.setState({course: {...this.state.course, subject: data.value}})} width={8} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Dropdown label='Department' placeholder='Select Department' onChange={(event, data) => this.setState({course: {...this.state.course, departmentId: data.value}})} selection options={DEPARTMENT_OPTIONS}/>
                        </Form.Group>
                        <Button onClick={() => this.addCourse()} icon='add' content='Add'/>
                    </Form>
            </Tab.Pane>
        );
    }

    renderPage() {

        const { logout, userInfo } = this.props;

        const panes = [
            { menuItem: 'Student', render: () => this.renderAddStudent() },
            { menuItem: 'Professor', render: () => this.renderAddProfessor() },
            { menuItem: 'Course', render: () => this.renderAddCourse() }
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