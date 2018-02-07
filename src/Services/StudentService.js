import { serverURL } from '../env';
import { registerUser } from './UserService';

export const addStudent = (studentInfo) => {
    var uri = `${serverURL}/addStudent`;
    return fetch(uri, {
        method: 'POST',
        body: JSON.stringify({
            firstName: studentInfo.firstName,
            lastName: studentInfo.lastName,
            dob: studentInfo.dob,
            major: studentInfo.major,
            startDate: studentInfo.startDate
        }), 
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then((response) => response.json())
        .then((responseJson) => {
            return registerUser(studentInfo.username, studentInfo.password, 'student', responseJson.insertId, responseJson)
                .then(res => {
                    const result = {studentRes: responseJson, userRes: res};
                    return result;
                });
        })
        .catch((error) => {
            console.error(error);
        });
}

export const getAllStudents = () => {
    const uri = `${serverURL}/getAllStudents`
    return fetch(uri).then(response => response.json())
        .then(responseJson => {
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
        });
}

export const deleteStudent = (studentId) => {
    var uri = `${serverURL}/deleteStudent`;
    return fetch(uri, {
        method: 'POST',
        body: JSON.stringify({
            studentId
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