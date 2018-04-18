import React, {Component} from 'react';
import { Dropdown, Icon, Image, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class ProfessorMenu extends Component {

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

        const { activeItem, logout, userInfo } = this.props;
        
        const options = [
            {
              key: 'user',
              text: <span>Signed in as <strong>{userInfo.firstName}  {userInfo.lastName}</strong></span>,
              disabled: true,
            },
            // { key: 'profile', text: 'Your Profile', onClick: () => console.log('profile clicked') },
            { key: 'sign-out', text: 'Sign Out', onClick: () => logout() },
        ];

        return (
            <Menu stackable borderless className='admin-menu-bar'>
                <Menu.Item>
                    <Image src={require('../../Assets/GeorgiaStateFlatLogo.png')} size='medium' />
                </Menu.Item>
                <Menu.Item active={activeItem === 'home'} as={Link} to='/professorhome'>Home</Menu.Item>
                <Menu.Item active={activeItem === 'chat'} as={Link} to='/chat'>Chat</Menu.Item>
                <Menu.Item position='right'>
                    <Dropdown style={{marginRight:'16px'}} pointing={this.state.width >= 769 && 'top right'} trigger={<span style={{marginRight: '5px'}}><Icon name='user' />{userInfo.firstName}</span>} options={options} />
                </Menu.Item>
            </Menu>
        );
    }
}