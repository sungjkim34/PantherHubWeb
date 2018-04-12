import React/*, { Component }*/ from 'react';
import { Header, Tab, Table } from 'semantic-ui-react';
// import { Redirect, Link } from 'react-router-dom';

const AccountTab = ({accounts}) => 
    <Tab.Pane>
        <Header as='h3'>Manage Accounts</Header>
        <Table celled selectable>
            <Table.Header>
            <Table.Row>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>Username</Table.HeaderCell>
                <Table.HeaderCell>Account Type</Table.HeaderCell>
                <Table.HeaderCell>Person Id</Table.HeaderCell>
                {/* <Table.HeaderCell></Table.HeaderCell> */}
            </Table.Row>
            </Table.Header>
            <Table.Body>
                {
                    accounts.map((account, i) => {
                        return (
                            <Table.Row key={i}>
                                <Table.Cell>{account.id}</Table.Cell>
                                <Table.Cell>{account.username}</Table.Cell>
                                <Table.Cell>{account.accountType}</Table.Cell>
                                <Table.Cell>{account.personId}</Table.Cell>
                                {/* <Table.Cell collapsing>
                                    <Icon link size='large' color='blue' name='edit' />
                                    <Icon link size='large' color='red' name='delete' onClick={() => this.deleteAccount(account.id)} />
                                </Table.Cell> */}
                            </Table.Row>
                        );
                    })
                }
            </Table.Body>
        </Table>
    </Tab.Pane>

export default AccountTab;


// import React, {Component} from 'react';
// import { Button, Header, Icon, Tab, Table } from 'semantic-ui-react';
// import { Redirect, Link } from 'react-router-dom';
// import { getAllAccounts } from '../../../Services/UserService';

// export default class AccountTab extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             accounts: []
//         };
//     }

//     componentDidMount() {
//         getAllAccounts().then(res => {
//             this.setState({accounts: res});
//         });
//     }

//     render() {

//         return (
//             <Tab.Pane>
//                 <Header as='h3'>Manage Accounts</Header>
//                 <Table celled selectable>
//                     <Table.Header>
//                     <Table.Row>
//                         <Table.HeaderCell>ID</Table.HeaderCell>
//                         <Table.HeaderCell>Username</Table.HeaderCell>
//                         <Table.HeaderCell>Account Type</Table.HeaderCell>
//                         <Table.HeaderCell>Person Id</Table.HeaderCell>
//                         {/* <Table.HeaderCell></Table.HeaderCell> */}
//                     </Table.Row>
//                     </Table.Header>
//                     <Table.Body>
//                         {
//                             this.state.accounts.map((account, i) => {
//                                 return (
//                                     <Table.Row key={i}>
//                                         <Table.Cell>{account.id}</Table.Cell>
//                                         <Table.Cell>{account.username}</Table.Cell>
//                                         <Table.Cell>{account.accountType}</Table.Cell>
//                                         <Table.Cell>{account.personId}</Table.Cell>
//                                         {/* <Table.Cell collapsing>
//                                             <Icon link size='large' color='blue' name='edit' />
//                                             <Icon link size='large' color='red' name='delete' onClick={() => this.deleteAccount(account.id)} />
//                                         </Table.Cell> */}
//                                     </Table.Row>
//                                 );
//                             })
//                         }
//                     </Table.Body>
//                 </Table>
//             </Tab.Pane>
//         );
//     }
// }