import React, {Component} from 'react';
import { Header, Image } from 'semantic-ui-react';
import './NotFound.css';

export default class NotFound extends Component {

    render() {
        return (
            <div className="home-container">
                <Image src={require('../../Assets/GeorgiaStateLogo.png')} size='medium' />
                <Header as='h2'>PantherHub - 404</Header>
                <p>Page Not Found</p>
            </div>
        );
    }
}