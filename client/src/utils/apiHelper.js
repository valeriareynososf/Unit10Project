export const api = (
    path,
    method = "GET",
    body  = null,
    credentials = null
) => {
    const url = "http://localhost:5000/api" + path;

    const options = {
        method,
        headers: {}
    }

    if (body) {
        options.body = JSON.stringify(body);
        options.headers["Content-Type"] = "application/json; charset=utf-8";
    }
    console.log("pathin apicall", path)
    console.log("method apicall", method)
    console.log("body in apicall", body)
console.log("creds in apicall", credentials)
    if (credentials) {
        const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
        options.headers.Authorization = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
}