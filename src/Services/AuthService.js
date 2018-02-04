import { serverURL } from '../env';

export const authUser = (username, password) => {
    const localStorage = window.localStorage;
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
            localStorage.setItem('loggedInUser', JSON.stringify(responseJson));
            localStorage.setItem('loggedInTime', Date.now());
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
        });
}

export const logOutUser = () => {
    const localStorage = window.localStorage;
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('loggedInTime');
}