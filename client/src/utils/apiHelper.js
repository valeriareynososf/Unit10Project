export const api = (
    path,
    method = "GET",
    body  = null,
    credentials = null
) => {
    // const url = "http://localhost:5000/api" + path;
    const url = `https://unit10project-production.up.railway.app/api` + path;
    const options = {
        method,
        headers: {}
    }

    if (body) {
        options.body = JSON.stringify(body);
        options.headers["Content-Type"] = "application/json; charset=utf-8";
    }

    if (credentials) {
        console.log("credentials", credentials)
        const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
        options.headers.Authorization = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
}