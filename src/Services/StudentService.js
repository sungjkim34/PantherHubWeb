import { serverURL } from '../env';
import { registerUser } from './UserService';

export const addStudent = (studentInfo) => {
    var uri = `${serverURL}/addStudents`;
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
            registerUser(studentInfo.username, studentInfo.password, 'student', responseJson.insertId)
                .then(res => console.log(res));
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