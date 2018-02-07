import React, {Component} from 'react';
import { Button, Dropdown, Form, Header, Icon, Image, Tab, Table } from 'semantic-ui-react';
import { checkUsername } from '../../../Services/UserService';
import moment from 'moment';
import { MAJOR_OPTIONS } from '../../../const';

export default class StudentTab extends Component {

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
        this.props.addStudent(this.state.student);
        this.setState({
            student: {...this.state.student, firstName: '', lastName: '', major: '', dob: '', startDate: '', username: '', password: ''},
            usernameExists: false
        });
    }

    render() {

        return (
            <Tab.Pane>
                <Header as='h3'>Manage Students</Header>
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
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            this.props.students.map((student, i) => {
                                return (
                                    <Table.Row key={i}>
                                        <Table.Cell>{student.id}</Table.Cell>
                                        <Table.Cell>{student.firstName}</Table.Cell>
                                        <Table.Cell>{student.lastName}</Table.Cell>
                                        <Table.Cell>{moment(student.dob,).format('MM-DD-YYYY')}</Table.Cell>
                                        <Table.Cell>{student.major}</Table.Cell>
                                        <Table.Cell>{moment(student.startDate).format('MM-DD-YYYY')}</Table.Cell>
                                        <Table.Cell collapsing>
                                            <Icon link size='large' color='blue' name='edit' />
                                            <Icon link size='large' color='red' name='delete' onClick={() => this.props.deleteStudent(student.id)} />
                                        </Table.Cell>
                                    </Table.Row>
                                );
                            })
                        }
                    </Table.Body>
                </Table>
            </Tab.Pane>
        );
    }
}