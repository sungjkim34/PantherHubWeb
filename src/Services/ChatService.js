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

export const deleteMessage = (messageId) => {
    const uri = `${serverURL}/deleteMessage/${messageId}`
    return fetch(uri).then(response => response.json())
        .then(responseJson => {
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
        });
}