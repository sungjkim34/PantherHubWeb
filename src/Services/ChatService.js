import { serverURL } from '../env';

export const getAllChat = () => {
    const uri = `${serverURL}/getAllChats`
    return fetch(uri).then(response => response.json())
        .then(responseJson => {
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
        });
}