import React, {Component} from 'react';
import { Button, Form, Header, Icon, Tab, Table } from 'semantic-ui-react';
// import moment from 'moment';
import { /*MAJOR_OPTIONS,*/ DEPARTMENT_OPTIONS } from '../../../const';

export default class CourseTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            course: {
                name: '',
                departmentId: '',
                credits: '',
                subject: ''
            }
        };
    }

    addCourse = () => {
        this.props.addCourse(this.state.course);
        this.setState({
            course: {...this.state.course, name: '', credits: '', subject: '', departmentId: ''}
        });
    }

    
    render() {

        return (
            <Tab.Pane>
                <Header as='h3'>Manage Courses</Header>
                    <Form>
                        <Form.Group>
                            <Form.Input label='Course Name' placeholder='Enter course name' value={this.state.course.name} onChange={(event, data) => this.setState({course: {...this.state.course, name: data.value}})} width={8} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Input label='Credits' placeholder='Enter number of credits' value={this.state.course.credits} onChange={(event, data) => this.setState({course: {...this.state.course, credits: data.value.replace(/[^0-9.,]/g, '')}})} width={8} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Input label='Subject' placeholder='Enter subject' value={this.state.course.subject} onChange={(event, data) => this.setState({course: {...this.state.course, subject: data.value}})} width={8} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Dropdown label='Department' value={this.state.course.departmentId} placeholder='Select Department' onChange={(event, data) => this.setState({course: {...this.state.course, departmentId: data.value}})} selection options={DEPARTMENT_OPTIONS}/>
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
                                            {/* <Icon link size='large' color='blue' name='edit' /> */}
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