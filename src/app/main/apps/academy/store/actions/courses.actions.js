import axios from 'axios';

export const GET_COURSES = '[ACADEMY APP] GET COURSES';
export const GET_CATEGORIES = '[ACADEMY APP] GET CATEGORIES';

export function getCourses()
{
    const request = axios.get('/api/v1/academy/courses');
    request.then((response) => 
            console.log(response)
        );

    return (dispatch) =>
        request.then((response) => 
            dispatch({
                type   : GET_COURSES,
                payload: response.data
            })
        );
}

export function getCategories()
{
    const request = axios.get('/api/v1/academy/categories');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_CATEGORIES,
                payload: response.data
            })
        );
}
