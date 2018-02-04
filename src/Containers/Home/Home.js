import React, {Component} from 'react';
import { Button, Card, Grid, Header, Image, Loader, Menu, Segment } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import './Home.css';

export default class Home extends Component {

    constructor(props) {
        super(props);
    }

    renderPage() {
        const { accountInfo, isLoggedIn, logout, userInfo } = this.props;

        return (
            <div className="home-page">
                <Menu stackable borderless style={{ backgroundColor: '#fff', border: '1px solid #ddd', boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',}}>
                        <Menu.Item>
                            <Image src={require('../../Assets/GeorgiaStateFlatLogo.png')} size='medium' />
                        </Menu.Item>
                        <Menu.Item active as={Link} to='/'>Home</Menu.Item>
                        <Menu.Item as={Link} to='/enrollment'>Enrollment</Menu.Item>
                        <Menu.Item as={Link} to='/'>Finances</Menu.Item>
                        <Menu.Item as={Link} to='/'>Class</Menu.Item>
                        <Menu.Item position='right'>
                            <span style={{marginRight: '10px'}}>{userInfo.firstName}</span>
                            <Button onClick={() => logout()} content='Logout' secondary/>
                        </Menu.Item>
                </Menu>
                <div className="home-container">
                    {accountInfo.accountType === 'admin' && <p>I see you are logged in as admin. TODO: Route to admin page.</p>}
                    <Header as='h2'>PantherHub - Home</Header>
                    <Card fluid header='Student Dashboard' description={`Welcome ${userInfo.firstName} ${userInfo.lastName}`}/>
                    <Grid columns={3} divided>
                        <Grid.Row stretched>
                        <Grid.Column>
                            <Segment>
                                <Header as='h4'>My Registration</Header>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment>
                                <Header as='h4'>My Bill</Header>
                                <p>Total Due:</p>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment>
                                <Header as='h4'>My Financial Aid</Header>
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