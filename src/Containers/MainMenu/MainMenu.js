import React, {Component} from 'react';
import { Button, Icon, Image, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './MainMenu.css';

export default class MainMenu extends Component {

    render() {

        const { activeItem, firstName, logout } = this.props;

        return (
            <Menu stackable borderless className='menu-bar'>
                <Menu.Item>
                    <Image src={require('../../Assets/GeorgiaStateFlatLogo.png')} size='medium' />
                </Menu.Item>
                <Menu.Item active={activeItem === 'home'} as={Link} to='/'>Home</Menu.Item>
                <Menu.Item active={activeItem === 'enrollment'} as={Link} to='/enrollment'>Enrollment</Menu.Item>
                <Menu.Item active={activeItem === 'class'} as={Link} to='/class'>Class</Menu.Item>
                <Menu.Item active={activeItem === 'chat'} as={Link} to='/chat'>Chat</Menu.Item>
                <Menu.Item position='right'>
                    <span style={{marginRight: '10px'}}><Icon name='user' />{firstName}</span>
                    <Button onClick={() => logout()} content='Logout' secondary/>
                </Menu.Item>
            </Menu>
        );
    }
}