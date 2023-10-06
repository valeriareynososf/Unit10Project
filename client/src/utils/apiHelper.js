export const api = (
    path,
    method = "GET",
    body  = null,
    credentials = null
) => {
    const url = "http://localhost:5000/api" + path;

    // const options = {

    // }
    return fetch(url);
}