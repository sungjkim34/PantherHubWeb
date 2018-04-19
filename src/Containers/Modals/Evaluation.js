import React, {Component} from 'react';
import { Button, Divider, Header, Icon, Image, Modal } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

export default class Evaluation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    triggerModal = () => {
        this.setState({open: !this.state.open});
    }

    render() {

        const { /*accountInfo,*/ userInfo, enrolledClasses } = this.props;
        const sortedEnrolledClasses = enrolledClasses.sort((a, b) => moment(a.startTime, 'HH:mm:ss').diff(moment(b.startTime, 'HH:mm:ss')));

        return (
            <Modal
                size='large'
                open={this.state.open}
                onClose={this.triggerModal}
                trigger={<Link to='#' onClick={() => this.triggerModal()}>Academic Schedule</Link>}>
                <Modal.Header>Academic Schedule</Modal.Header>
                <Modal.Content image scrolling>
                    <Image
                        size='medium'
                        src={require('../../Assets/GeorgiaStateLogo.png')}
                        wrapped
                    />

                    <Modal.Description style={{width: '100%'}}>
                        <Header>{userInfo.firstName} {userInfo.lastName}</Header>
                        <span><strong>Current Major: </strong></span><span style={{float:'right'}}>{userInfo.major}</span>
                        <Divider />
                        {
                            sortedEnrolledClasses.length ? 
                                <table style={{width: '100%', marginBottom: 20}}>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Monday</th>
                                            <th>Tuesday</th>
                                            <th>Wednesday</th>
                                            <th>Thursday</th>
                                            <th>Friday</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            sortedEnrolledClasses.map((enrolledClass, i) => 
                                                <tr key={i}>
                                                    <td></td>
                                                    {JSON.parse(enrolledClass.classDays).includes('monday') ? <td><p>{enrolledClass.name}</p> {moment(enrolledClass.startTime, 'HH:mm:ss').format('hh:mma')} - {moment(enrolledClass.endTime, 'HH:mm:ss').format('hh:mma')}</td> : <td></td>}
                                                    {JSON.parse(enrolledClass.classDays).includes('tuesday') ? <td><p>{enrolledClass.name}</p> {moment(enrolledClass.startTime, 'HH:mm:ss').format('hh:mma')} - {moment(enrolledClass.endTime, 'HH:mm:ss').format('hh:mma')}</td> : <td></td>}
                                                    {JSON.parse(enrolledClass.classDays).includes('wednesday') ? <td><p>{enrolledClass.name}</p> {moment(enrolledClass.startTime, 'HH:mm:ss').format('hh:mma')} - {moment(enrolledClass.endTime, 'HH:mm:ss').format('hh:mma')}</td> : <td></td>}
                                                    {JSON.parse(enrolledClass.classDays).includes('thursday') ? <td><p>{enrolledClass.name}</p> {moment(enrolledClass.startTime, 'HH:mm:ss').format('hh:mma')} - {moment(enrolledClass.endTime, 'HH:mm:ss').format('hh:mma')}</td> : <td></td>}
                                                    {JSON.parse(enrolledClass.classDays).includes('friday') ? <td><p>{enrolledClass.name}</p> {moment(enrolledClass.startTime, 'HH:mm:ss').format('hh:mma')} - {moment(enrolledClass.endTime, 'HH:mm:ss').format('hh:mma')}</td> : <td></td>}
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table> :
                                <div style={{textAlign: 'center', marginTop: 10}}>
                                    You are currently not enrolled in any classes.
                                </div>
                        }
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                <Button primary onClick={() => this.triggerModal()}>
                    Finish <Icon name='right chevron' />
                </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}