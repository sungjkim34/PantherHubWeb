import React, {Component} from 'react';
import { Button, Card, Divider, Grid, Header, List, Loader, Radio, Segment } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import Evaluation from '../Modals/Evaluation';
import Payment from '../Modals/Payment';
import ContactInfo from '../Modals/ContactInfo';
import ProfessorMenu from './ProfessorMenu';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
    }

    renderPage() {

        const { accountInfo, logout, userInfo } = this.props;

        return (
            <div className='home-page'>
                <ContactInfo ref='contactInfoModal' accountInfo={accountInfo} userInfo={userInfo}/>
                <ProfessorMenu activeItem='home' userInfo={userInfo} logout={logout}/>
                <div className='home-container'>
                    <Header as='h2'>PantherHub - Home</Header>
                    <Card fluid header='Professor Dashboard' description={`Welcome ${userInfo.firstName} ${userInfo.lastName}`}/>
                    <Grid columns={1} divided>
                        <Grid.Row stretched>
                            <Grid.Column>
                                <Segment>
                                    <Header as='h2'>Professor</Header>
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

        if (userInfo) {
            if(accountInfo.accountType === 'student') return <Redirect to='/' />;
            else if (accountInfo.accountType === 'professor') return this.renderPage();
            else if (accountInfo.accountType === 'admin') return <Redirect to='/admin' />;
            else return <Redirect to='/login' />
        } else if (isLoggedIn){
            return <div><Loader active size='massive'>Loading</Loader></div>;
        } else {
            return <Redirect to='/login' />
        }
    }
}