import React, {Component} from 'react';
import { Button, Comment, Form, Header, Loader } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import './Chat.css';
import MainMenu from '../MainMenu/MainMenu';
import AdminMenu from '../Admin/AdminMenu';
import openSocket from 'socket.io-client';
import { serverURL } from '../../env';
import { getAllChat, deleteMessage } from '../../Services/ChatService';
import moment from 'moment';

export default class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            socket: openSocket(serverURL),
            messageText: '',
            messages: []
        };
        
        this.state.socket.on('sendMessage', message => {
            this.setState({messages: [...this.state.messages, message.message]});
        });
    }

    componentDidMount() {
        getAllChat().then(messages => {
            this.setState({messages: this.state.messages.concat(messages)});
        });
    }

    componentWillUnmount() {
        this.state.socket.disconnect();
        this.setState({});
    }

    sendMessage = () => {
        const message = {
            authorId: this.props.accountInfo.personId,
            authorType: this.props.accountInfo.accountType,
            authorFirstName: this.props.userInfo.firstName,
            authorLastName: this.props.userInfo.lastName,
            messageText: this.state.messageText,
            messageDate: Date.now()
        }
        this.state.socket.emit('sendMessage', message);
        this.setState({messageText: ''});
    }

    deleteMessage = (messageId) => {
        deleteMessage(messageId).then(res => {
            this.setState({messages: this.state.messages.filter(message => message.id !== messageId)}); 
        });
    }

    renderPage() {
        const { accountInfo, logout, userInfo } = this.props;

        return (
            <div className='chat-page'>
                {
                    accountInfo.accountType === 'student' ?
                        <MainMenu activeItem='chat' firstName={userInfo.firstName} lastName={userInfo.lastName} logout={logout}/> :
                        <AdminMenu activeItem='chat' userInfo={userInfo} logout={logout}/>
                }
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
                            // this.state.messages.sort((a, b) => b.date - a.date).map((message, i) =>
                            this.state.messages.map((message, i) =>
                                <Comment key={i}>
                                    <Comment.Content>
                                        <Comment.Author style={{color: message.authorType === 'admin' ? '#DA4167' : message.authorType === 'professor' ? '#4392F1' : undefined}} as='span'>{`${message.authorFirstName} ${message.authorLastName}`}</Comment.Author>
                                        <Comment.Metadata>
                                            {/* {i === 0 && <Icon name='alarm'/>} */}
                                            <div>{moment(message.messageDate).format('MMM DD, YYYY [at] hh:mma')}</div>
                                        </Comment.Metadata>
                                        <Comment.Text>{message.messageText}</Comment.Text>
                                        {
                                            (accountInfo.personId === message.authorId || accountInfo.accountType === 'admin') &&
                                                <Comment.Actions>
                                                    <a onClick={() => this.deleteMessage(message.id)}>Delete</a>
                                                </Comment.Actions>
                                        }
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

        const { accountInfo, isLoggedIn, userInfo } = this.props;

        // return (
        //     userInfo ? accountInfo.accountType === 'student' ? this.renderPage() : <Redirect to='/admin' /> :
        //     isLoggedIn ? <div><Loader active size='massive'>Loading</Loader></div> : 
        //         <Redirect to='/login' />
        // );

        if (userInfo) {
            if(accountInfo.accountType === 'student') return this.renderPage();
            else if (accountInfo.accountType === 'professor') return this.renderPage();
            else if (accountInfo.accountType === 'admin') return this.renderPage();
            else return <Redirect to='/login' />
        } else if (isLoggedIn){
            return <div><Loader active size='massive'>Loading</Loader></div>;
        } else {
            return <Redirect to='/login' />
        }
    }
}