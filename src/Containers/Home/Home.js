import React, {Component} from 'react';
import { Button, Card, Divider, Grid, Header, Image, List, Loader, Radio, Segment } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import Evaluation from '../Evaluation/Evaluation';
import MainMenu from '../MainMenu/MainMenu';
import './Home.css';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            overallGpa: 3.52,
            totalDue: '$2401.61',
            degree: 'Bachelor of Science',
            major: 'Computer Science',
            tuitionType: 'In State'
        };
    }

    renderPage() {
        const { accountInfo, logout, userInfo } = this.props;

        return (
            <div className='home-page'>
                <MainMenu activeItem='home' firstName={userInfo.firstName} logout={logout}/>
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
                                <Button primary fluid style={{marginBottom:'5px'}}>Add Classes</Button>
                                <Button secondary fluid>Drop Classes</Button>
                                <Divider />
                                <Header as='h3'>Undergraduate Semester GPA</Header>
                                <span><strong>Overall GPA:</strong></span><span style={{float:'right'}}>{this.state.overallGpa}</span>
                                <Divider />
                                <Header as='h3' style={{marginBottom:'0px'}}>Degree(s) and Major OR Pathway</Header>
                                <p><Evaluation accountInfo={accountInfo} userInfo={userInfo}/></p>
                                <span><strong>Degree:</strong></span><span style={{float:'right'}}>{this.state.degree}</span>
                                <p/>
                                <span><strong>Major:</strong></span><span style={{float:'right'}}>{this.state.major}</span>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment>
                                <Header as='h3'>My Bill</Header>
                                <span><strong>Total Due:</strong></span><span style={{float:'right'}}>{this.state.totalDue}</span>
                                <Button style={{marginTop:'10px'}} onClick={() => {}} content='Pay Account' fluid primary/>
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
                                    <List.Item><strong><u>Class:</u></strong> Classes blah blah blah</List.Item>
                                    <List.Item><strong><u>Chat:</u></strong> Chat blah blah blah</List.Item>
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

        const { isLoggedIn, userInfo } = this.props;

        return (
            userInfo ? this.renderPage() :
            isLoggedIn ? <div><Loader active size='massive'>Loading</Loader></div> : 
                <Redirect to='/login' />
        );
    }
}