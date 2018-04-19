import React, {Component} from 'react';
import { Dropdown, Icon, Image, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './MainMenu.css';

export default class MainMenu extends Component {

    constructor(props) {
        super(props);
        this.state = { width: 0, height: 0 };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
      
    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    render() {

        const { activeItem, firstName, lastName, logout, toggleContactInfo } = this.props;

        const options = [
            {
              key: 'user',
              text: <span>Signed in as <strong>{firstName} {lastName}</strong></span>,
              disabled: true,
            },
            { key: 'profile', text: 'Your Profile', onClick: () => toggleContactInfo() },
            { key: 'sign-out', text: 'Sign Out', onClick: () => logout() },
        ];

        return (
            <Menu stackable borderless className='menu-bar'>
                <Menu.Item>
                    <Image src={require('../../Assets/GeorgiaStateFlatLogo.png')} size='medium' />
                </Menu.Item>
                <Menu.Item active={activeItem === 'home'} as={Link} to='/'>Home</Menu.Item>
                <Menu.Item active={activeItem === 'enrollment'} as={Link} to='/enrollment'>Enrollment</Menu.Item>
                {/* <Menu.Item active={activeItem === 'class'} as={Link} to='/class'>Class</Menu.Item> */}
                <Menu.Item active={activeItem === 'chat'} as={Link} to='/chat'>Chat</Menu.Item>
                <Menu.Item position='right'>
                    <Dropdown style={{marginRight:'16px'}} pointing={this.state.width >= 769 && 'top right'} trigger={<span style={{marginRight: '5px'}}><Icon name='user' />{firstName}</span>} options={options} />
                </Menu.Item>
            </Menu>
        );
    }
}