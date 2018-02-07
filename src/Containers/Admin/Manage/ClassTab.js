import React, {Component} from 'react';
import { Button, Dropdown, Form, Header, Icon, Image, Loader, Tab, Table } from 'semantic-ui-react';
import moment from 'moment';
import { MAJOR_OPTIONS, DEPARTMENT_OPTIONS } from '../../const';

export default class ClassTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            class: {
                name: '',
                courseId: undefined,
                startTime: '',
                endTime: '',
                days: [],
                professorId: '',
                maxStudents: '',
                location: ''
            }
        };
    }

    addCourse = () => {
        this.props.addCourse(this.state.props);

    }

    render() {

        return (
            <Tab.Pane>
                <Header as='h3'>Manage Classes</Header>
                    <Form>
                        <Form.Group>
                            <Form.Input label='Class Name' placeholder='Enter class name' value={this.state.course.name} onChange={(event, data) => this.setState({course: {...this.state.course, name: data.value}})} width={8} />
                            <Form.Dropdown label='Course' value={this.state.course.departmentId} placeholder='Select Department' onChange={(event, data) => this.setState({course: {...this.state.course, departmentId: data.value}})} selection options={DEPARTMENT_OPTIONS}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Input label='Start Time' placeholder='Enter start time' value={this.state.course.credits} onChange={(event, data) => this.setState({course: {...this.state.course, credits: data.value.replace(/[^0-9.,]/g, '')}})} width={8} />
                            <Form.Input label='End Time' placeholder='Enter end time' value={this.state.course.credits} onChange={(event, data) => this.setState({course: {...this.state.course, credits: data.value.replace(/[^0-9.,]/g, '')}})} width={8} />
                        </Form.Group>
                        <Form.Group>
                            {/* TODO: MAKE DAYS A MULTI SELECT DROPDOWN */}
                            <Form.Input label='Days' placeholder='Enter class days' value={this.state.course.subject} onChange={(event, data) => this.setState({course: {...this.state.course, subject: data.value}})} width={8} />
                            <Form.Dropdown label='Professor' value={this.state.course.departmentId} placeholder='Select Department' onChange={(event, data) => this.setState({course: {...this.state.course, departmentId: data.value}})} selection options={DEPARTMENT_OPTIONS}/>
                        </Form.Group>
                            <Form.Input label='Location' placeholder='Enter class location' value={this.state.course.subject} onChange={(event, data) => this.setState({course: {...this.state.course, subject: data.value}})} width={8} />
                            <Form.Input label='Max Students' placeholder='Enter max number of students' value={this.state.course.subject} onChange={(event, data) => this.setState({course: {...this.state.course, subject: data.value}})} width={8} />
                        <Form.Group>
                            
                        </Form.Group>
                        <Button onClick={() => this.addCourse()} icon='add' content='Add'/>
                    </Form>
                    <Table celled selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Department ID</Table.HeaderCell>
                            <Table.HeaderCell>Credits</Table.HeaderCell>
                            <Table.HeaderCell>Subject</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            this.props.courses.map((course, i) => {
                                return (
                                    <Table.Row key={i}>
                                        <Table.Cell>{course.id}</Table.Cell>
                                        <Table.Cell>{course.name}</Table.Cell>
                                        <Table.Cell>{course.departmentId}</Table.Cell>
                                        <Table.Cell>{course.credits}</Table.Cell>
                                        <Table.Cell>{course.subject}</Table.Cell>
                                        <Table.Cell collapsing>
                                            <Icon link size='large' color='blue' name='edit' />
                                            <Icon link size='large' color='red' name='delete' onClick={() => this.props.deleteCourse(course.id)} />
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