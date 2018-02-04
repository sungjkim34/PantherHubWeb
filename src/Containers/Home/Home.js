import React, {Component} from 'react';
import { Button, Card, Divider, Grid, Header, Image, Loader, Segment } from 'semantic-ui-react';
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
            major: 'Computer Science'
        };
    }

    renderPage() {
        const { accountInfo, logout, userInfo } = this.props;

        return (
            <div className="home-page">
                <MainMenu activeItem='home' firstName={userInfo.firstName} logout={logout}/>
                <div className="home-container">
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
                                <p><Evaluation/></p>
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
                            </Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment>
                                <Header as='h3'>My Financial Aid</Header>
                                <strong>Aid Year</strong>
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