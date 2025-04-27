// send a request to the server

// the server will respond with something
const response = await fetch("https://api.opendota.com/api/heroes", {
  method: "GET",
});
const body = await response.json();
console.log(body);
