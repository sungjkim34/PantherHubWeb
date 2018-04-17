import React, {Component} from 'react';
import { Button, Checkbox, Header, Icon, Tab, Table } from 'semantic-ui-react';
import moment from 'moment';
// import { DAYS_OF_WEEK } from '../../const';
// import { mapProfessors } from '../../Services/ProfessorService';
// import { mapCourses } from '../../Services/CourseService';
import { formatDays } from '../../Utils/DateUtil';
import { getStudentEnrollment, dropClass } from '../../Services/EnrollmentService';

export default class ManageTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dropClassList: [],
            enrolledClasses: []
        };
    }
    
    componentDidMount() {
        getStudentEnrollment(this.props.userInfo.id).then(res => {
            this.setState({enrolledClasses: res});
        });
    }

    checkDropClass = (enrollmentId) => {
        this.state.dropClassList.includes(enrollmentId) ? this.setState({dropClassList: this.state.dropClassList.filter(classId => classId !== enrollmentId)}) : this.setState({dropClassList: [...this.state.dropClassList, enrollmentId]});
        console.log(this.state.dropClassList);
    }

    dropClass = () => {
        this.state.dropClassList.forEach(dropEnrollmentId => {
            dropClass(dropEnrollmentId).then(res => {
                // console.log(res);
                this.setState({enrolledClasses: this.state.enrolledClasses.filter(classInfo => classInfo.id !== dropEnrollmentId), dropClassList: []});
            });
        });
    }

    resetDropList = () => {
        this.setState({dropClassList: []});
    }

    render() {
        
        const { enrolledClasses } = this.state;

        return (
            <Tab.Pane active>
                    {
                        enrolledClasses.length !== 0 ?
                            <div>
                                <Header as='h3'>Added Classes</Header>
                                <Table celled selectable>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell></Table.HeaderCell>
                                            <Table.HeaderCell>CRN</Table.HeaderCell>
                                            <Table.HeaderCell>Course</Table.HeaderCell>
                                            <Table.HeaderCell>Time</Table.HeaderCell>
                                            <Table.HeaderCell>Days</Table.HeaderCell>
                                            <Table.HeaderCell>Professor</Table.HeaderCell>
                                            <Table.HeaderCell>Location</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {
                                            enrolledClasses.map((classInfo, i) => {
                                                return (
                                                    <Table.Row key={i}>
                                                        <Table.Cell collapsing>
                                                            <Checkbox checked={this.state.dropClassList.includes(classInfo.id)} onClick={() => this.checkDropClass(classInfo.id)}/>
                                                        </Table.Cell>
                                                        <Table.Cell>{classInfo.classId}</Table.Cell>
                                                        <Table.Cell>{classInfo.name}</Table.Cell>
                                                        <Table.Cell>{moment(classInfo.startTime, 'hh:mm:ss').format('hh:mm a')} - {moment(classInfo.endTime, 'hh:mm:ss').format('hh:mm a')}</Table.Cell>
                                                        <Table.Cell>{formatDays(JSON.parse(classInfo.classDays))}</Table.Cell>
                                                        <Table.Cell>{classInfo.professorFirstName} {classInfo.professorLastName}</Table.Cell>
                                                        <Table.Cell>{classInfo.location}</Table.Cell>
                                                    </Table.Row>
                                                );
                                            })
                                        }
                                    </Table.Body>
                                    <Table.Footer fullWidth>
                                        <Table.Row>
                                            <Table.HeaderCell colSpan='7'>
                                                <Button onClick={() => this.dropClass()} floated='right' icon labelPosition='left' color='red' size='small'>
                                                    <Icon name='minus' /> Drop
                                                </Button>
                                                <Button onClick={() => this.resetDropList()} floated='right' icon labelPosition='left' secondary size='small'>
                                                    <Icon name='repeat' /> Reset 
                                                </Button>
                                            </Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Footer>
                                </Table>
                            </div> :
                            <div style={{textAlign: 'center', margin: '50px'}}>
                                <p>No enrolled classes.</p>
                                <p>Please use the Add Class tab to enroll in classes.</p>
                            </div>
                    }
            </Tab.Pane>
        );
    }
}