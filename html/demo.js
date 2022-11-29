const username = "ansiyu"
const url = "http://localhost:9999"
const password = "12345678"
fetch(url+"/login",{
    method: "POST",
    headers: {
        'Content-type': 'application/x-www-form-urlencoded'
    },
    body: queryString.stringify({
        "username": username,
        "password": password
    }),
})
    .then(response => response.json())
    .then(data =>console.log(data))