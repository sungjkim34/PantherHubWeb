import { serverURL } from '../env';

export const authUser = (username, password) => {
    const sessionStorage = window.sessionStorage;
    const uri = `${serverURL}/authUser`
    return fetch(uri, {
        method: 'POST',
        body: JSON.stringify({
            username, password
        }), 
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then((response) => response.json())
        .then((responseJson) => {
            if(!Array.isArray(responseJson) && responseJson.sqlState !== '42000'){
                sessionStorage.setItem('loggedInUser', JSON.stringify(responseJson));
                sessionStorage.setItem('loggedInTime', Date.now());
            } else if(responseJson.sqlState === '42000') {
                return [];
            }
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
        });
}

export const logOutUser = () => {
    const sessionStorage = window.sessionStorage;
    sessionStorage.removeItem('loggedInUser');
    sessionStorage.removeItem('loggedInTime');
}