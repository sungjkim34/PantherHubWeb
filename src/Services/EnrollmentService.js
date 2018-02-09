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
        .then(responseJson => {
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
        });
}

export const dropClass = (enrollmentId) => {
    var uri = `${serverURL}/dropClass`;
    return fetch(uri, {
        method: 'POST',
        body: JSON.stringify({
            enrollmentId
        }), 
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then((response) => response.json())
        .then(responseJson => {
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
        });
}

export const getStudentEnrollment = (studentId) => {
    const uri = `${serverURL}/getStudentEnrollment/${studentId}`;
    return fetch(uri).then(response => response.json())
        .then(responseJson => {
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
        });
}