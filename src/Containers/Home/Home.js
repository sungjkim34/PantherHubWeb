import React, {Component} from 'react';
import { Button, Card, Divider, Grid, Header, List, Loader, Radio, Segment } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import Evaluation from '../Modals/Evaluation';
import Payment from '../Modals/Payment';
import ContactInfo from '../Modals/ContactInfo';
import MainMenu from '../MainMenu/MainMenu';
import { getStudentEnrollment } from '../../Services/EnrollmentService';
import { getTotalStudentTransaction } from '../../Services/TransactionService';
import { COST_STUDENT_FEE, COST_PER_CREDIT } from '../../const';
import './Home.css';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            overallGpa: 3.52,
            totalDue: 0,
            degree: 'Bachelor of Science',
            tuitionType: 'In State',
            enrolledClasses: [],
            totalPaid: 0
        };
    }

    componentDidMount() {
        if(this.props.accountInfo) {
            getStudentEnrollment(this.props.accountInfo.personId).then(enrolledClasses => {
                this.setState({ enrolledClasses });
                if (enrolledClasses.length) {
                    let totalDue = 0;
                    enrolledClasses.forEach(enrolledClass => {
                        totalDue += (enrolledClass.credits * COST_PER_CREDIT);
                    });
                    totalDue += COST_STUDENT_FEE;
                    this.setState({ totalDue });
                    getTotalStudentTransaction(this.props.accountInfo.personId).then(transactions => {
                        const { totalPaid } = transactions;
                        this.setState({ totalPaid: totalPaid })
                        this.setState({ totalDue: this.state.totalDue - totalPaid });
                    })
                } else {
                    this.setState({ totalDue: 0 });
                }
            });
        }
    }

    payTuition = (payAmount) => {
        this.setState({totalDue: this.state.totalDue - payAmount});
    }

    toggleContactInfo = () => {
        this.refs.contactInfoModal.triggerModal();
    }

    renderPage() {

        const { accountInfo, logout, userInfo } = this.props;
        const { enrolledClasses } = this.state;

        return (
            <div className='home-page'>
                <ContactInfo ref='contactInfoModal' accountInfo={accountInfo} userInfo={userInfo}/>
                <MainMenu activeItem='home' firstName={userInfo.firstName} lastName={userInfo.lastName} logout={logout} toggleContactInfo={() => this.toggleContactInfo()}/>
                <div className='home-container'>
                    {accountInfo.accountType === 'admin' && <p>I see you are logged in as admin. TODO: Route to admin page.</p>}
                    <Header as='h2'>PantherHub - Home</Header>
                    <Card fluid header='Student Dashboard' description={`Welcome ${userInfo.firstName} ${userInfo.lastName}`}/>
                    <Grid columns={3} divided>
                        <Grid.Row stretched>
                        <Grid.Column>
                            <Segment>
                                <Header as='h2'>My Registration</Header>
                                <strong>Spring Semester 2018</strong>
                                <p>Eligible to Register</p>
                                <Button primary fluid style={{marginBottom:'5px'}} onClick={() => this.props.history.push('/enrollment')} >Add Classes</Button>
                                <Button secondary fluid onClick={() => this.props.history.push('/enrollment/manage')}>Drop Classes</Button>
                                <Divider />
                                {/* <Header as='h3'>Undergraduate Semester GPA</Header>
                                <span><strong>Overall GPA:</strong></span><span style={{float:'right'}}>{this.state.overallGpa}</span>
                                <Divider /> */}
                                <Header as='h3' style={{marginBottom:'0px'}}>Degree(s) and Major OR Pathway</Header>
                                <p><Evaluation enrolledClasses={enrolledClasses} degreeaccountInfo={accountInfo} userInfo={userInfo}/></p>
                                <span><strong>Degree:</strong></span><span style={{float:'right'}}>{this.state.degree}</span>
                                <p/>
                                <span><strong>Major:</strong></span><span style={{float:'right'}}>{this.props.userInfo.major}</span>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment>
                                <Header as='h3'>My Bill</Header>
                                <span><strong>Total Due:</strong></span><span style={{float:'right'}}>${parseFloat(Math.round(this.state.totalDue * 100) / 100).toFixed(2)}</span>
                                {/* <Button style={{marginTop:'10px'}} onClick={() => {}} content='Pay Account' fluid primary/> */}
                                <p><Payment enrolledClasses={this.state.enrolledClasses} totalDue={this.state.totalDue} userInfo={userInfo} accountInfo={accountInfo} payTuition={(payAmount) => this.payTuition(payAmount)}/></p>
                                <Divider />
                                <span><strong>Tuition Classification:</strong></span><span style={{float:'right'}}>{this.state.tuitionType}</span>
                                <Divider />
                                <Header as='h3'>My Financial Aid</Header>
                                <p style={{color: 'red', marginTop:'10px'}}>Please go to the Enrollment tab and look under the Financial Aid Information section to access financial aid forms.</p>
                                <p><strong>Aid Year</strong></p>
                                <Radio label='2017-2018' defaultChecked/>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment>
                                <Header as='h3'>Welcome Student</Header>
                                <p>Georgia State University prohibits the application or use of any unauthorized external hardware, software, or programming technologies to aid in any function performed in GoSOLAR or INB Banner. The use of unauthorized technologies may result in disciplinary action.</p>
                                <Divider />
                                <p>The tabs at the top of the page provide quick and easy access to student information you need for a successful term:</p>
                                <List bulleted>
                                    <List.Item><strong><u>Home:</u></strong> Review and complete financial aid, make payments, access financial information.</List.Item>
                                    <List.Item><strong><u>Enrollment:</u></strong> For registration and record transactions and information.</List.Item>
                                    <List.Item><strong><u>Class:</u></strong> View currently registered classes and course information.</List.Item>
                                    <List.Item><strong><u>Chat:</u></strong> Communicate with your classmates and professors</List.Item>
                                </List>
                            </Segment>
                        </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
            </div>
        );
    }

    render() {

        const { isLoggedIn, userInfo, accountInfo } = this.props;

        // return (
        //     userInfo ? accountInfo.accountType === 'student' ? this.renderPage() : <Redirect to='/admin' /> :
        //     isLoggedIn ? <div><Loader active size='massive'>Loading</Loader></div> : 
        //         <Redirect to='/login' />
        // );

        if (userInfo) {
            if(accountInfo.accountType === 'student') return this.renderPage();
            else if (accountInfo.accountType === 'professor') return <Redirect to='/professorhome' />;
            else if (accountInfo.accountType === 'admin') return <Redirect to='/admin' />;
            else return <Redirect to='/login' />
        } else if (isLoggedIn){
            return <div><Loader active size='massive'>Loading</Loader></div>;
        } else {
            return <Redirect to='/login' />
        }
    }
}