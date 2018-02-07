import React, {Component} from 'react';
import { Button, Dropdown, Form, Header, Icon, Image, Tab, Table } from 'semantic-ui-react';
import { checkUsername } from '../../../Services/UserService';
import moment from 'moment';
import { DEPARTMENT_OPTIONS } from '../../../const';

export default class ProfessorTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            professor: {
                firstName: '',
                lastName: '',
                departmentId: '',
                dob: '',
                username: '',
                password: ''
            },
            usernameExists: false
        };
    }

    enterUsername = (username) => {
        this.setState({professor: {...this.state.professor, username}});
        if(username.replace(/ /g, '') !== ''){
            checkUsername(username).then(res => {
                this.setState({usernameExists: res});
            });
        }
    }

    isFormValid() {
        if ((this.state.professor.firstName.replace(/ /g, '') === '') ||
            (this.state.professor.lastName.replace(/ /g, '') === '') ||
            (this.state.professor.username.replace(/ /g, '') === '') ||
            (this.state.professor.password.replace(/ /g, '') === '') ||
            (this.state.professor.departmentId.replace(/ /g, '') === '') ||
            (!moment(this.state.professor.dob, 'YYYY-MM-DD', true).isValid()) ||
            (this.state.usernameExists)) {
            return false;
        }
        return true;
    }

    addProfessor = () => {
        this.props.addProfessor(this.state.professor);
        this.setState({
            professor: {...this.state.student, firstName: '', lastName: '', dob: '', departmentId: undefined, username: '', password: ''},
            usernameExists: false
        });
    }

    render() {

        return (
            <Tab.Pane>
                <Header as='h3'>Manage Professors</Header>
                <Form>
                    <Form.Group>
                        <Form.Input label='First Name' placeholder='Enter first name' value={this.state.professor.firstName} onChange={(event, data) => this.setState({professor: {...this.state.professor, firstName: data.value}})} width={8} />
                        <Form.Input label='Last Name' placeholder='Enter last name' value={this.state.professor.lastName} onChange={(event, data) => this.setState({professor: {...this.state.professor, lastName: data.value}})} width={8} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Input label='Username' error={this.state.usernameExists} placeholder='Enter username' value={this.state.professor.username} onChange={(event, data) => this.enterUsername(data.value)} width={8} />
                        <Form.Input label='Password' placeholder='Enter password' value={this.state.professor.password} onChange={(event, data) => this.setState({professor: {...this.state.professor, password: data.value}})} width={8} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Input label='Date of Birth' type='date' value={this.state.professor.dob} onChange={(event, data) => this.setState({professor: {...this.state.professor, dob: data.value}})} width={3} />
                        <Form.Dropdown label='Department' value={this.state.professor.departmentId} placeholder='Select Department' onChange={(event, data) => this.setState({professor: {...this.state.professor, departmentId: data.value}})} selection options={DEPARTMENT_OPTIONS}/>
                    </Form.Group>
                    <Button disabled={!this.isFormValid()} onClick={() => this.addProfessor()} icon='add user' content='Add'/>
                </Form>
                <Table celled selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>First Name</Table.HeaderCell>
                            <Table.HeaderCell>Last Name</Table.HeaderCell>
                            <Table.HeaderCell>DOB</Table.HeaderCell>
                            <Table.HeaderCell>Department ID</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            this.props.professors.map((professor, i) => {
                                return (
                                    <Table.Row key={i}>
                                        <Table.Cell>{professor.id}</Table.Cell>
                                        <Table.Cell>{professor.firstName}</Table.Cell>
                                        <Table.Cell>{professor.lastName}</Table.Cell>
                                        <Table.Cell>{moment(professor.dob).format('MM-DD-YYYY')}</Table.Cell>
                                        <Table.Cell>{professor.departmentId}</Table.Cell>
                                        <Table.Cell collapsing>
                                            <Icon link size='large' color='blue' name='edit' />
                                            <Icon link size='large' color='red' name='delete' onClick={() => this.props.deleteProfessor(professor.id)} />
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