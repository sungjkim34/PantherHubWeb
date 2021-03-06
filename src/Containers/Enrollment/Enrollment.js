import React, {Component} from 'react';
import { Loader, Tab } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import './Enrollment.css';
import { getAllClassesDetailed } from '../../Services/ClassService';
import ContactInfo from '../Modals/ContactInfo';
import MainMenu from '../MainMenu/MainMenu';
import ClassTab from './ClassTab';
import ManageTab from './ManageTab';

export default class Enrollment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            classes: [],
            enrolledClasses: [],
            currentTab: 0
        }
    }

    componentDidMount() {
        getAllClassesDetailed().then(res => {
            this.setState({classes: res});
        });
        this.props.match.path === '/enrollment/manage' && this.setState({currentTab: 1});
    }

    enrollClass = (classId) => {
        console.log(classId);
    }

    changeTab = (tabIndex) => {
        this.setState({currentTab: tabIndex});
    }

    toggleContactInfo = () => {
        this.refs.contactInfoModal.triggerModal();
    }

    renderPage() {
        const { accountInfo, logout, userInfo } = this.props;

        const panes = [
            { menuItem: 'Add Class', render: () => <ClassTab userInfo={userInfo} classes={this.state.classes} enrollClass={this.enrollClass}/> },
            { menuItem: 'Manage Class', render: () => <ManageTab userInfo={userInfo} /> }
        ];

        return (
            <div className='enrollment-page'>
                <ContactInfo ref='contactInfoModal' accountInfo={accountInfo} userInfo={userInfo}/>
                <MainMenu activeItem='enrollment' firstName={userInfo.firstName} lastName={userInfo.lastName} logout={logout} toggleContactInfo={() => this.toggleContactInfo()}/>
                <div className='enrollment-container'>
                    <Tab panes={panes} activeIndex={this.state.currentTab} onTabChange={(event, data) => this.changeTab(data.activeIndex)}/>
                </div>
            </div>
        );
    }

    render() {

        const { accountInfo, isLoggedIn, userInfo } = this.props;

        return (
            userInfo ? accountInfo.accountType === 'student' ? this.renderPage() : <Redirect to='/admin' /> :
            isLoggedIn ? <div><Loader active size='massive'>Loading</Loader></div> : 
                <Redirect to='/login' />
        );
    }
}