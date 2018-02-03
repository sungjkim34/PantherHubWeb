import { serverURL } from '../env';

export const authUser = (username, password) => {
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
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
        });
}