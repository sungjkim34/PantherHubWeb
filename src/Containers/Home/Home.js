import React, {Component} from 'react';
import { getUserInfo } from '../../Services/UserService';
import { Button, Card, Form, Grid, Header, Image, Menu, Segment } from 'semantic-ui-react';
import { Switch, Route, Link } from 'react-router-dom';
import './Home.css';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: {}
        };
        if(!this.props.accountInfo) {
            this.props.history.push('/login')
        } else {
            getUserInfo(this.props.accountInfo).then(userInfo => {
                this.setState({userInfo: userInfo});
            });
        }
    }

    logout() {
        this.props.logout();
        this.props.history.push('/login');
    }

    render() {
        return (
            <div className="home-page">
                <Menu stackable borderless style={{ backgroundColor: '#fff', border: '1px solid #ddd', boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',}}>
                        <Menu.Item>
                            <Image src={require('../../Assets/GeorgiaStateFlatLogo.png')} size='medium' />
                        </Menu.Item>
                        <Menu.Item active as={Link} to='/'>Home</Menu.Item>
                        <Menu.Item as={Link} to='/'>Enrollment</Menu.Item>
                        <Menu.Item as={Link} to='/'>Finances</Menu.Item>
                        <Menu.Item as={Link} to='/'>Class</Menu.Item>
                        <Menu.Item position='right'>
                            <span style={{marginRight: '10px'}}>{this.state.userInfo.firstName}</span>
                            <Button onClick={() => this.logout()} content='Logout' secondary/>
                        </Menu.Item>
                </Menu>
                <div className="home-container">
                    <Header as='h2'>PantherHub - Enrollment</Header>
                    <Card fluid header='Student Dashboard' description={`Welcome ${this.state.userInfo.firstName} ${this.state.userInfo.lastName}`}/>
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
}