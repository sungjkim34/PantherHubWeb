import { serverURL } from '../env';

export const registerClass = (studentId, classId) => {
    var uri = `${serverURL}/registerClass`;
    return fetch(uri, {
        method: 'POST',
        body: JSON.stringify({
            studentId,
            classId
        }), 
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then((response) => response.json())
        .then((responseJson) => response.json())
            .then(responseJson => {
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });
}

export const dropClass = (studentId, classId) => {
    var uri = `${serverURL}/dropClass`;
    return fetch(uri, {
        method: 'POST',
        body: JSON.stringify({
            studentId,
            classId
        }), 
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then((response) => response.json())
        .then((responseJson) => response.json())
            .then(responseJson => {
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });
}