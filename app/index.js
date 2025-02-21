import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import {
  createHeroPost,
  deleteHeroPost,
  getAllHeroPosts,
  updateHeroPost,
} from "./db.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// run the web server.

// create an express function, but have it call requests
const app = express();

// point to the react app build and serve those files
app.use(express.static(path.join(__dirname, "./client/dist")));

// turn res objects into json via express
app.use(express.json());
// add a request handler
// arrow function called when app received request for that route. request,response.
// the get route to get all of the hero post - reading for data
app.get("/api/hero-post", (req, res) => {
  // data will be an array of objects. API route to get that data.
  const heroPosts = getAllHeroPosts();
  res.send(heroPosts);
});
// post to create data
app.post("/api/hero-post", (req, res) => {
  createHeroPost(req.body);
  res.send("create hero post response");
});

// update CRUD. :id to catch all.
app.put("/api/hero-post/:id", (req, res) => {
  updateHeroPost(req.params.id, req.body);
  res.send("update this hero info response");
});

// delete CRUD
app.delete("/api/hero-post/:id", (req, res) => {
  deleteHeroPost(req.params.id);
  res.send("delete this hero info reponse");
});

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
