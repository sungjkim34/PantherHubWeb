import React, {Component} from 'react';
import { Button, Comment, Form, Header, Image, Loader, Menu } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import './Chat.css';
import MainMenu from '../MainMenu/MainMenu';
import openSocket from 'socket.io-client';
import { serverURL } from '../../env';
import moment from 'moment';

export default class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // socket: openSocket(serverURL),
            messageText: '',
            messages: []
        };
        
        // this.state.socket.on('sendMessage', message => {
        //     this.setState({messages: [...this.state.messages, message]});
        // });
    }

    sendMessage = () => {
        console.log(this.state.messageText);
        // this.state.socket.emit('sendMessage', this.state.messageText, this.props.userInfo, this.props.accountInfo, Date.now());
        this.setState({messageText: ''});
    }

    renderPage() {
        const { accountInfo, logout, userInfo } = this.props;

        return (
            <div className='chat-page'>
                <MainMenu activeItem='chat' firstName={userInfo.firstName} logout={logout}/>
                <div className='chat-container'>
                    <div className='comment-section'>
                        <Comment.Group>
                            <Header as='h3' dividing>Chat</Header>
                            <Form>
                                <Form.Group>
                                    <Form.Input placeholder='Enter Message' value={this.state.messageText} onChange={(event, data) => this.setState({messageText: data.value})} width={8}/>
                                    <Button disabled={!this.state.messageText} onClick={() => this.sendMessage()} icon='send' content='Send'/>
                                </Form.Group>
                            </Form>
                        {
                            this.state.messages.sort((a, b) => b.date - a.date).map((message, i) =>
                                <Comment key={i}>
                                    <Comment.Content>
                                        <Comment.Author as='span'>{message.name}</Comment.Author>
                                        <Comment.Metadata>
                                            {/* {i === 0 && <Icon name='alarm'/>} */}
                                            <div>{moment(message.date).format('MMM DD, YYYY [at] hh:mma')}</div>
                                        </Comment.Metadata>
                                        <Comment.Text>message.text</Comment.Text>
                                    </Comment.Content>
                                </Comment>
                            )
                        }
                        </Comment.Group>
                    </div>
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