import { serverURL } from '../env';

export const addCourse = (courseInfo) => {
    var uri = `${serverURL}/addCourse`;
    return fetch(uri, {
        method: 'POST',
        body: JSON.stringify({
            name: courseInfo.name,
            departmentId: courseInfo.departmentId,
            credits: courseInfo.credits,
            subject: courseInfo.subject
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

export const getAllCourses = () => {
    const uri = `${serverURL}/getAllCourses`
    return fetch(uri).then(response => response.json())
        .then(responseJson => {
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
        });
}

export const deleteCourse = (courseId) => {
    var uri = `${serverURL}/deleteCourse`;
    return fetch(uri, {
        method: 'POST',
        body: JSON.stringify({
            courseId
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