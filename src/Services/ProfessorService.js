import { serverURL } from '../env';
import { registerUser } from './UserService';

export const addProfessor = (professorInfo) => {
    var uri = `${serverURL}/addProfessor`;
    return fetch(uri, {
        method: 'POST',
        body: JSON.stringify({
            firstName: professorInfo.firstName,
            lastName: professorInfo.lastName,
            dob: professorInfo.dob,
            departmentId: professorInfo.departmentId
        }), 
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then((response) => response.json())
        .then((responseJson) => {
            registerUser(professorInfo.username, professorInfo.password, 'professor', responseJson.insertId)
                .then(res => console.log(res));
        })
        .catch((error) => {
            console.error(error);
        });
}

export const getAllProfessors = () => {
    const uri = `${serverURL}/getAllProfessors`
    return fetch(uri).then(response => response.json())
        .then(responseJson => {
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
        });
}