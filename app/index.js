import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { PrismaClient } from "@prisma/client";
import { requireAuth } from "@clerk/express";

const prisma = new PrismaClient();

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
// calling next to move on from requireAuth to asnyc (req,res)

// middleware function: request, response, and next.
// to call next function if the user who sent the request is logged in. Confer how Clerk verifies the user is logged in

app.get(
  "/api/hero-post",
  requireAuth({ signInUrl: "/sign-in" }),
  async (req, res) => {
    // data will be an array of objects. API route to get that data.
    // using await inside the async. this will be visible in HTTP tests.
    const heroPosts = await prisma.heroPost.findMany();
    res.send(heroPosts);
  }
);
// post to create data
app.post(
  "/api/hero-post",
  requireAuth({ signInUrl: "/sign-in" }),
  async (req, res) => {
    await prisma.heroPost.create({
      data: {
        name: req.body.name,
        photoUrl: req.body.photoUrl,
        ultimate: req.body.ultimate,
        user: { connect: { username: "seanlee" } },
      },
    });
    res.send("create hero post response");
  }
);

// update CRUD. :id to catch all.
app.put(
  "/api/hero-post/:id",
  requireAuth({ signInUrl: "/sign-in" }),
  async (req, res) => {
    await prisma.heroPost.update({
      data: {
        name: req.body.name,
        photoUrl: req.body.photoUrl,
        ultimate: req.body.ultimate,
      },
      where: { id: Number(req.params.id) },
    });
    res.send("update this hero info response");
  }
);

// delete CRUD
app.delete(
  "/api/hero-post/:id",
  requireAuth({ signInUrl: "/sign-in" }),
  async (req, res) => {
    await prisma.heroPost.delete({
      where: { id: Number(req.params.id) },
    });
    res.send("delete this hero info reponse");
  }
);

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});

// middleware function: request, response, and next.
// to call next function if the user who sent the request is logged in. Confer how Clerk verifies the user is logged in
