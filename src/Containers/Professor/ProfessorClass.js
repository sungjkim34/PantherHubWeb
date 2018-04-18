import React, { Component } from 'react';
import { Button, Card, Divider, Grid, Header, Loader, Segment } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import ContactInfo from '../Modals/ContactInfo';
import ProfessorMenu from './ProfessorMenu';
import moment from 'moment';

import { getClassesTaughtByProfessor, getStudentsEnrolledInClass } from '../../Services/ClassService';
import { dropClass } from '../../Services/EnrollmentService';

export default class ProfessorClass extends Component {

    constructor(props) {
        super(props);
        this.state = {
            classesTaught: []
        };
    }

    componentWillReceiveProps(nextProps) {
        !this.state.classesTaught.length && getClassesTaughtByProfessor(nextProps.userInfo.id).then(classesTaught => {
            classesTaught.forEach(classTaught => {
                getStudentsEnrolledInClass(classTaught.classId).then(students => {
                    classTaught.students = students;
                    this.setState({ classesTaught: [...this.state.classesTaught, classTaught] });
                });
            });
        });
    }

    componentDidMount() {
        const { userInfo } = this.props;
        userInfo && getClassesTaughtByProfessor(userInfo.id).then(classesTaught => {
            classesTaught.forEach(classTaught => {
                getStudentsEnrolledInClass(classTaught.classId).then(students => {
                    classTaught.students = students;
                    this.setState({ classesTaught: [...this.state.classesTaught, classTaught] });
                });
            });
        });
    }

    dropStudent = (enrollmentId) => {
        dropClass(enrollmentId).then(res => {
            const tempClassesTaught = [...this.state.classesTaught];
            tempClassesTaught.map(classTaught => {
                classTaught.students = classTaught.students.filter(student => student.enrollmentId !== enrollmentId);
            });
            this.setState({ classesTaught: tempClassesTaught });
        });
    }

    renderPage() {

        const { accountInfo, logout, userInfo } = this.props;
        const { classesTaught } = this.state;

        return (
            <div className='home-page'>
                <ContactInfo ref='contactInfoModal' accountInfo={accountInfo} userInfo={userInfo} />
                <ProfessorMenu activeItem='class' userInfo={userInfo} logout={logout} />
                <div className='home-container'>
                    <Header as='h2'>PantherHub - Class</Header>
                    <Card fluid header='Professor Class Management' description='View courses currently teaching' />
                    {
                        classesTaught.map((classTaught, i) =>
                            <Segment key={i}>
                                <Header as='h2'>{classTaught.courseName}</Header>
                                <Header as='h4'>{moment(classTaught.startTime, 'HH:mm:ss').format('hh:mma')} - {moment(classTaught.endTime, 'HH:mm:ss').format('hh:mma')}</Header>
                                <Header as='h4'>{JSON.parse(classTaught.classDays).map((day, i) => <span key={i}>{day.charAt(0).toUpperCase()}{day.substring(1, day.length)} </span>)}</Header>
                                <Divider />
                                <Header as='h3'>Students</Header>
                                {
                                    classTaught.students.length === 0 && <p>You currently have no students enrolled in this class.</p>
                                }
                                {
                                    classTaught.students.map((student, i) =>
                                        <Card key={i} fluid>
                                            <Card.Content>
                                                <Card.Header>
                                                    {student.firstName} {student.lastName}
                                                </Card.Header>
                                                <Card.Meta>
                                                    {student.major}
                                                </Card.Meta>
                                                <Card.Description>
                                                    {moment(student.dob).format('MMMM DD, YYYY')}
                                                </Card.Description>
                                            </Card.Content>
                                            <Card.Content extra>
                                                <Button fluid basic color='red' onClick={() => this.dropStudent(student.enrollmentId)}>Drop</Button>
                                            </Card.Content>
                                        </Card>
                                    )
                                }
                            </Segment>
                        )
                    }
                </div>
            </div>
        );
    }

    render() {

        const { isLoggedIn, userInfo, accountInfo } = this.props;

        if (userInfo) {
            if (accountInfo.accountType === 'student') return <Redirect to='/' />;
            else if (accountInfo.accountType === 'professor') return this.renderPage();
            else if (accountInfo.accountType === 'admin') return <Redirect to='/admin' />;
            else return <Redirect to='/login' />
        } else if (isLoggedIn) {
            return <div><Loader active size='massive'>Loading</Loader></div>;
        } else {
            return <Redirect to='/login' />
        }
    }
}