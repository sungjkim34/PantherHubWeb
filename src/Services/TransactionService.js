import { serverURL } from '../env';

export const addTransaction = (transaction) => {
    var uri = `${serverURL}/addTransaction`;
    return fetch(uri, {
        method: 'POST',
        body: JSON.stringify({
            studentId: transaction.studentId,
            amountPaid: transaction.amountPaid
        }), 
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
        });
}

export const getStudentTransactions = (studentId) => {
    const uri = `${serverURL}/getStudentTransactions/${studentId}`
    return fetch(uri).then(response => response.json())
        .then(responseJson => {
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
        });
}

export const getTotalStudentTransaction = (studentId) => {
    const uri = `${serverURL}/getTotalStudentTransaction/${studentId}`
    return fetch(uri).then(response => response.json())
        .then(responseJson => {
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
        });
}

export const deleteTransaction = (transactionId) => {
    var uri = `${serverURL}/deleteTransaction`;
    return fetch(uri, {
        method: 'POST',
        body: JSON.stringify({
            transactionId
        }), 
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then((response) => response.json())
        .then((responseJson) => console.log(responseJson))
        .catch((error) => {
            console.error(error);
        });   
}