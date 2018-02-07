import React, {Component} from 'react';
import { Button, Comment, Dropdown, Form, Header, Icon, Image, Loader, Tab, Table } from 'semantic-ui-react';
import { Redirect, Link } from 'react-router-dom';
import { addStudent, deleteStudent, getAllStudents } from '../../Services/StudentService';
import { addProfessor, deleteProfessor, getAllProfessors } from '../../Services/ProfessorService';
import { addCourse, deleteCourse, getAllCourses } from '../../Services/CourseService';
import { checkUsername, getAllAccounts } from '../../Services/UserService';
import './Admin.css';
import AdminMenu from './AdminMenu';
import moment from 'moment';
import { MAJOR_OPTIONS, DEPARTMENT_OPTIONS } from '../../const';
import AccountTab from './Manage/AccountTab';
import StudentTab from './Manage/StudentTab';
import ProfessorTab from './Manage/ProfessorTab';
import CourseTab from './Manage/CourseTab';
// import ClassTab from './Manage/ClassTab';

export default class AdminManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            students: [],
            professors: [],
            courses: [],
            accounts: [],
            classes: []
        };
    }

    componentDidMount() {
        getAllStudents().then(res => {
            this.setState({students: res});
        });
        getAllProfessors().then(res => {
            this.setState({professors: res});
        });
        getAllCourses().then(res => {
            this.setState({courses: res});
        });
        getAllAccounts().then(res => {
            this.setState({accounts: res});
        });
    }

    // deleteAccount = (accountId) => {
    //     deleteAccount(accountId).then(res => {
    //         console.log(res);
    //     });
    // }

    addStudent = (student) => {
        addStudent(student).then(res => {
            // this.setState({
            //     student: {...this.state.student, firstName: '', lastName: '', major: '', dob: '', startDate: '', username: '', password: ''},
            //     usernameExists: false
            // });
            console.log(res);
        });
    }

    deleteStudent = (studentId) => {
        deleteStudent(studentId).then(res => {
            this.setState({
                students: this.state.students.filter(student => student.id !== studentId),
                accounts: this.state.accounts.filter(account => account.personId !== studentId)
            });
            console.log(res);
        });
    }

    addProfessor = (professor) => {
        console.log(professor);
        addProfessor(professor).then(res => {
            // this.setState({
            //     professor: {...this.state.student, firstName: '', lastName: '', dob: '', departmentId: undefined, username: '', password: ''},
            //     usernameExists: false
            // });
            console.log(res);
        });
    }

    deleteProfessor = (professorId) => {
        deleteProfessor(professorId).then(res => {
            this.setState({
                professors: this.state.professors.filter(professor => professor.id !== professorId),
                accounts: this.state.accounts.filter(account => account.personId !== professorId)
            });
            console.log(res);
        });
    }

    addCourse = (course) => {
        console.log(course);
        addCourse(course).then(res => {
            // this.setState({
            //     course: {...this.state.course, name: '', credits: '', subject: '', departmentId: undefined},
            // });
            console.log('--------- ADD COURSE RESULTS --------');
            console.log(res);
            this.setState({courses: [
                ...this.state.courses,
                {id: res.insertId, name: course.name, credits: course.credits, subject: course.subject, departmentId: course.departmentId}
            ]});
        });
    }

    deleteCourse = (courseId) => {
        deleteCourse(courseId).then(res => {
            this.setState({courses: this.state.courses.filter(course => course.id !== courseId)});
            console.log(res);
        });
    }

    renderPage() {

        const { logout, userInfo } = this.props;

        const panes = [
            { menuItem: 'Accounts', render: () => <AccountTab accounts={this.state.accounts}/> },
            { menuItem: 'Student', render: () => <StudentTab students={this.state.students} addStudent={this.addStudent} deleteStudent={this.deleteStudent}/> },
            { menuItem: 'Professor', render: () => <ProfessorTab professors={this.state.professors} addProfessor={this.addProfessor} deleteProfessor={this.deleteProfessor}/> },
            { menuItem: 'Course', render: () => <CourseTab courses={this.state.courses} addCourse={this.addCourse} deleteCourse={this.deleteCourse}/> },
            // { menuItem: 'Class', render: () => <ClassTab courses={this.state.classes} addClass={this.addClass} deleteClass={this.deleteClass}/> }
        ];

        return (
            <div className='admin-page'>
                <AdminMenu activeItem='adminManage' userInfo={userInfo} logout={logout}/>
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