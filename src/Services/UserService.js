import { serverURL } from '../env';

export const getUserInfo = (accountInfo) => {
    if(accountInfo.accountType === 'student'){
        const uri = `${serverURL}/getStudent/${accountInfo.personId}`;
        return fetch(uri).then((response) => response.json())
            .then((responseJson) => {
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });
    }
    if(accountInfo.accountType === 'professor'){
        const uri = `${serverURL}/getProfessor/${accountInfo.personId}`;
        return fetch(uri).then((response) => response.json())
            .then((responseJson) => {
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });
    }
    if(accountInfo.accountType === 'admin'){
        return new Promise((resolve, reject) => {
            resolve({
                firstName: 'admin',
                lastName: ''
            });
        });
    }
}

export const registerUser = (username, password, accountType, personId) => {
    var uri = `${serverURL}/registerUser`;
    return fetch(uri, {
        method: 'POST',
        body: JSON.stringify({
            username,
            password,
            accountType,
            personId
        }), 
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
        });
}

export const checkUsername = (username) => {
    var uri = `${serverURL}/checkUsername/${username}`;
        return fetch(uri).then((response) => response.json())
            .then((responseJson) => {
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });
}

export const deleteAccount = (accountId) => {
    var uri = `${serverURL}/deleteAccount`;
    return fetch(uri, {
        method: 'POST',
        body: JSON.stringify({
            accountId
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

export const getAllAccounts = () => {
    var uri = `${serverURL}/getAllAccounts`;
        return fetch(uri).then((response) => response.json())
            .then((responseJson) => {
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });
}