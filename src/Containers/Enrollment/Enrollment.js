import React, {Component} from 'react';
import { Button, Header, Image, Loader, Menu } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import './Enrollment.css';

export default class Enrollment extends Component {

    // constructor(props) {
    //     super(props);
    // }

    renderPage() {
        const { accountInfo, logout, userInfo } = this.props;

        return (
            <div className="enrollment-page">
                <Menu stackable borderless style={{ backgroundColor: '#fff', border: '1px solid #ddd', boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',}}>
                        <Menu.Item>
                            <Image src={require('../../Assets/GeorgiaStateFlatLogo.png')} size='medium' />
                        </Menu.Item>
                        <Menu.Item as={Link} to='/'>Home</Menu.Item>
                        <Menu.Item active as={Link} to='/enrollment'>Enrollment</Menu.Item>
                        <Menu.Item as={Link} to='/'>Finances</Menu.Item>
                        <Menu.Item as={Link} to='/'>Class</Menu.Item>
                        <Menu.Item position='right'>
                            <span style={{marginRight: '10px'}}>{userInfo.firstName}</span>
                            <Button onClick={() => logout()} content='Logout' secondary/>
                        </Menu.Item>
                </Menu>
                ENROLLMENT
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