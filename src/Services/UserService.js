import { serverURL } from '../env';

export const getUserInfo = (accountInfo) => {
    var uri = `${serverURL}`
    if(accountInfo.accountType === 'student'){
        uri = uri.concat('/getStudent/' + accountInfo.personId);
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
                lastName: 'admin'
            });
        });
    }
    
}