import React, {Component} from 'react';
import { Button, Form, Header, Icon, Tab, Table } from 'semantic-ui-react';
import moment from 'moment';
import { DAYS_OF_WEEK } from '../../../const';
import { mapProfessors } from '../../../Services/ProfessorService';
import { mapCourses } from '../../../Services/CourseService';

export default class ClassTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            class: {
                courseId: '',
                startTime: '',
                endTime: '',
                classDays: [],
                professorId: '',
                maxStudents: '',
                location: ''
            },
            professorOptions: [],
            courseOptions: []
        };
    }

    componentDidMount() {
        mapProfessors().then(res => {
            this.setState({professorOptions: res});
        });

        mapCourses().then(res => {
            this.setState({courseOptions: res});
        });
    }

    isFormValid() {
        if ((this.state.class.courseId === '') ||
            (this.state.class.startTime.replace(/ /g, '') === '') ||
            (this.state.class.endTime.replace(/ /g, '') === '') ||
            (this.state.class.classDays.length === 0) ||
            (this.state.class.professorId === '') ||
            (this.state.class.maxStudents.replace(/ /g, '') === '') ||
            (this.state.class.location.replace(/ /g, '') === '')) {
            return false
        }
        return true;
    }

    addClass = () => {
        this.props.addClass(this.state.class);
        this.setState({
            class: {...this.state.class, name: '', courseId: '', startTime: '', endTime: '', classDays: [], professorId: '', maxStudents: '', location: ''}
        });
    }

    render() {

        return (
            <Tab.Pane>
                <Header as='h3'>Manage Classes</Header>
                    <Form>
                        <Form.Group>
                            {/* <Form.Input label='Days' placeholder='Enter class days' value={this.state.class.classDays} onChange={(event, data) => this.setState({class: {...this.state.class, classDays: data.value}})} width={8} /> */}
                            <Form.Dropdown label='Course' value={this.state.class.courseId} placeholder='Select Course' onChange={(event, data) => this.setState({class: {...this.state.class, courseId: data.value}})} selection options={this.state.courseOptions}/>
                            <Form.Dropdown label='Professor' value={this.state.class.professorId} placeholder='Select Professor' onChange={(event, data) => this.setState({class: {...this.state.class, professorId: data.value}})} selection options={this.state.professorOptions}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Input label='Start Time' type='time' placeholder='Enter start time' value={this.state.class.startTime} onChange={(event, data) => this.setState({class: {...this.state.class, startTime: data.value}})} width={3} />
                            <Form.Input label='End Time' type='time' placeholder='Enter end time' value={this.state.class.endTime} onChange={(event, data) => this.setState({class: {...this.state.class, endTime: data.value}})} width={3} />
                            <Form.Dropdown label='Days' value={this.state.class.classDays} placeholder='Select Days' onChange={(event, data) => this.setState({class: {...this.state.class, classDays: data.value}})} selection multiple options={DAYS_OF_WEEK}/>
                        </Form.Group>
                            <Form.Input label='Location' placeholder='Enter class location' value={this.state.class.location} onChange={(event, data) => this.setState({class: {...this.state.class, location: data.value}})} width={8} />
                            <Form.Input label='Max Students' placeholder='Enter max number of students' value={this.state.class.maxStudents} onChange={(event, data) => data.value.length < 4 && this.setState({class: {...this.state.class, maxStudents: data.value.replace(/[^0-9.,]/g, '')}})} width={8} />
                        <Form.Group>
                            
                        </Form.Group>
                        <Button disabled={!this.isFormValid()} onClick={() => this.addClass()} icon='add' content='Add'/>
                    </Form>
                    <Table celled selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Course ID</Table.HeaderCell>
                            <Table.HeaderCell>Time</Table.HeaderCell>
                            <Table.HeaderCell>Days</Table.HeaderCell>
                            <Table.HeaderCell>Max Students</Table.HeaderCell>
                            <Table.HeaderCell>Professor ID</Table.HeaderCell>
                            <Table.HeaderCell>Location</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            this.props.classes.map((classInfo, i) => {
                                return (
                                    <Table.Row key={i}>
                                        <Table.Cell>{classInfo.id}</Table.Cell>
                                        <Table.Cell>{classInfo.courseId}</Table.Cell>
                                        <Table.Cell>{moment(classInfo.startTime, 'hh:mm:ss').format('hh:mm a')} - {moment(classInfo.endTime, 'hh:mm:ss').format('hh:mm a')}</Table.Cell>
                                        <Table.Cell>{JSON.parse(classInfo.classDays).map(day => `${day} `)}</Table.Cell>
                                        <Table.Cell>{classInfo.maxStudents}</Table.Cell>
                                        <Table.Cell>{classInfo.professorId}</Table.Cell>
                                        <Table.Cell>{classInfo.location}</Table.Cell>
                                        <Table.Cell collapsing>
                                            <Icon link size='large' color='blue' name='edit' />
                                            <Icon link size='large' color='red' name='delete' onClick={() => this.props.deleteClass(classInfo.id)} />
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