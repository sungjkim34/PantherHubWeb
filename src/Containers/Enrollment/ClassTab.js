import React, {Component} from 'react';
import { Button, Header, Icon, Tab, Table } from 'semantic-ui-react';
import moment from 'moment';
// import { DAYS_OF_WEEK } from '../../const';
// import { mapProfessors } from '../../Services/ProfessorService';
// import { mapCourses } from '../../Services/CourseService';
import { formatDays } from '../../Utils/DateUtil';
import { registerClass } from '../../Services/EnrollmentService';
import { getStudentEnrollment } from '../../Services/EnrollmentService';

export default class ClassTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addedClasses: [],
            enrolledClasses: []
        };
    }

    componentDidMount() {
        getStudentEnrollment(this.props.userInfo.id).then(res => {
            // This.setState is causing error. May need to move this api call up to enrollment component
            this.setState({enrolledClasses: res});
        });
    }

    addClass = (classInfo) => {
        this.setState({addedClasses: [...this.state.addedClasses, classInfo]})
    }

    removeClass = (classId) => {
        const classList = this.state.addedClasses.filter(classInfo => classInfo.id !== classId);
        this.setState({addedClasses: classList});
    }

    isClassAdded = (classId) => {
        return this.state.addedClasses.filter(classInfo => classInfo.id === classId).length === 0;
    }

    isClassRegistered = (classId) => {
        return this.state.enrolledClasses.filter(enrolledClass => enrolledClass.classId === classId).length === 0;
    }

    // registerClasses = () => {
    //     this.state.addedClasses.map(classInfo => {
    //         registerClass(this.props.userInfo.id, classInfo.id).then(res => console.log(res));
    //     });
    //     this.setState({addedClasses: []});
    //     // disable reregistering from class
    //     // Maybe call getAllClassesDetailed from this file and pop out the class when added.
    // }

    registerClasses = () => {
        this.state.addedClasses.forEach(classInfo => {
            registerClass(this.props.userInfo.id, classInfo.id).then(res => {
                console.log(res);
                this.setState({enrolledClasses: [...this.state.enrolledClasses, {classId: classInfo.id}]});
            });
        });
        this.setState({addedClasses: []});
        // disable reregistering from class
        // Maybe call getAllClassesDetailed from this file and pop out the class when added.
    }

    resetClasses = () => {
        this.setState({addedClasses: []});
    }

    render() {

        return (
            <Tab.Pane>
                    {
                        this.state.addedClasses.length !== 0 &&
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
                                            this.state.addedClasses.map((classInfo, i) => {
                                                return (
                                                    <Table.Row key={i}>
                                                        <Table.Cell collapsing>
                                                            <Icon link size='large' color='red' name='remove' onClick={() => this.removeClass(classInfo.id)} />
                                                        </Table.Cell>
                                                        <Table.Cell>{classInfo.id}</Table.Cell>
                                                        <Table.Cell>{classInfo.name}</Table.Cell>
                                                        <Table.Cell>{moment(classInfo.startTime, 'hh:mm:ss').format('hh:mm a')} - {moment(classInfo.endTime, 'hh:mm:ss').format('hh:mm a')}</Table.Cell>
                                                        <Table.Cell>{formatDays(JSON.parse(classInfo.classDays))}</Table.Cell>
                                                        <Table.Cell>{classInfo.firstName} {classInfo.lastName}</Table.Cell>
                                                        <Table.Cell>{classInfo.location}</Table.Cell>
                                                    </Table.Row>
                                                );
                                            })
                                        }
                                    </Table.Body>
                                    <Table.Footer fullWidth>
                                        <Table.Row>
                                            <Table.HeaderCell colSpan='7'>
                                                <Button onClick={() => this.registerClasses()} floated='right' icon labelPosition='left' primary size='small'>
                                                    <Icon name='check' /> Register
                                                </Button>
                                                <Button onClick={() => this.resetClasses()} floated='right' icon labelPosition='left' secondary size='small'>
                                                    <Icon name='repeat' /> Reset 
                                                </Button>
                                            </Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Footer>
                                </Table>
                            </div>
                    }
                    <Header as='h3'>Add Classes</Header>
                    <Table celled selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell></Table.HeaderCell>
                            <Table.HeaderCell>CRN</Table.HeaderCell>
                            <Table.HeaderCell>Course</Table.HeaderCell>
                            <Table.HeaderCell>Time</Table.HeaderCell>
                            <Table.HeaderCell>Days</Table.HeaderCell>
                            <Table.HeaderCell>Cap</Table.HeaderCell>
                            <Table.HeaderCell>Rem</Table.HeaderCell>
                            <Table.HeaderCell>Professor</Table.HeaderCell>
                            <Table.HeaderCell>Location</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            this.props.classes.map((classInfo, i) => {
                                return (
                                    <Table.Row key={i}>
                                        <Table.Cell collapsing>
                                            {this.isClassRegistered(classInfo.id) && this.isClassAdded(classInfo.id) ? <Icon link size='large' color='blue' name='add' onClick={() => this.addClass(classInfo)} /> : <Icon disabled size='large' color='blue' name='add' />}
                                        </Table.Cell>
                                        <Table.Cell>{classInfo.id}</Table.Cell>
                                        <Table.Cell>{classInfo.name}</Table.Cell>
                                        <Table.Cell>{moment(classInfo.startTime, 'hh:mm:ss').format('hh:mm a')} - {moment(classInfo.endTime, 'hh:mm:ss').format('hh:mm a')}</Table.Cell>
                                        <Table.Cell>{formatDays(JSON.parse(classInfo.classDays))}</Table.Cell>
                                        <Table.Cell>{classInfo.maxStudents}</Table.Cell>
                                        <Table.Cell>--</Table.Cell>
                                        <Table.Cell>{classInfo.firstName} {classInfo.lastName}</Table.Cell>
                                        <Table.Cell>{classInfo.location}</Table.Cell>
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