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
            return registerUser(professorInfo.username, professorInfo.password, 'professor', responseJson.insertId, responseJson)
                .then(res => {
                    const result = {professorRes: responseJson, userRes: res};
                    return result;
                });
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

export const deleteProfessor = (professorId) => {
    var uri = `${serverURL}/deleteProfessor`;
    return fetch(uri, {
        method: 'POST',
        body: JSON.stringify({
            professorId
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