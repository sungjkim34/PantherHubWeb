import { serverURL } from '../env';

export const addClass = (classInfo) => {
    var uri = `${serverURL}/addClass`;
    return fetch(uri, {
        method: 'POST',
        body: JSON.stringify({
            courseId: classInfo.courseId,
            professorId: classInfo.professorId,
            startTime: classInfo.startTime,
            endTime: classInfo.endTime,
            classDays: classInfo.classDays,
            maxStudents: classInfo.maxStudents,
            location: classInfo.location
        }), 
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
        });
}

export const getAllClasses = () => {
    const uri = `${serverURL}/getAllClasses`
    return fetch(uri).then(response => response.json())
        .then(responseJson => {
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
        });
}

export const deleteClass = (classId) => {
    var uri = `${serverURL}/deleteClass`;
    return fetch(uri, {
        method: 'POST',
        body: JSON.stringify({
            classId
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