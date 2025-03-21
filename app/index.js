import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { PrismaClient } from "@prisma/client";
import { requireAuth } from "@clerk/express";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { clerkMiddleware } from "@clerk/express";

const prisma = new PrismaClient();

const s3 = new S3Client({
  region: "us-east-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// run the web server.

// create an express function, but have it call requests
const app = express();

// point to the react app build and serve those files
app.use(express.static(path.join(__dirname, "./client/dist")));

app.use(clerkMiddleware());

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

    // sort the heroes by newest on top
    const heroPosts = await prisma.heroPost.findMany({
      include: { user: true },
      orderBy: { createdAt: "desc" },
    });
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
        // req.auth.userId for the current user's ID in Clerk
        user: { connect: { idInClerk: req.auth.userId } },
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
    // to grab the first hero post that matches both the ID and the user, not just any post

    req.auth.userId;

    const post = await prisma.heroPost.findFirst({
      include: { user: true },
      where: { id: Number(req.params.id) },
    });

    // "The idInClerk of the user of the post"
    // post.user.idInClerk
    // if they are not allowed then throw an error - to immediately exit the code and by default, logs the error
    if (post.user.idInClerk !== req.auth.userId) {
      throw new Error("You are not the correct logged in user for this post");
    }

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

// delete CRUD. Delete posts that are only yours.
app.delete(
  "/api/hero-post/:id",
  requireAuth({ signInUrl: "/sign-in" }),
  async (req, res) => {
    const post = await prisma.heroPost.findFirst({
      include: { user: true },
      where: { id: Number(req.params.id) },
    });

    if (post.user.idInClerk !== req.auth.userId) {
      throw new Error("You are not the correct logged in user for this post");
    }
    await prisma.heroPost.delete({
      where: { id: Number(req.params.id) },
    });

    res.send("delete this hero info reponse");
  }
);

app.post(
  "/api/generate-upload-url",
  requireAuth({ signInUrl: "/sign-in" }),
  async (req, res) => {
    try {
      const { filename, contentType } = req.body;
      const userId = req.auth.userId; // Clerk provides this

      if (!filename || !contentType) {
        return res
          .status(400)
          .json({ error: "Missing filename or contentType" });
      }
      // decide the dynamic part of the url with a timestamp in the filename
      const key = `uploads/${Date.now()}-${filename}`;

      const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: key,
        ContentType: contentType,
        ACL: "private", // Files are private by default
      });

      const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 }); // 60 sec expiry

      res.json({ uploadUrl: signedUrl, key });
    } catch (error) {
      console.error("Error generating signed URL:", error);
      res.status(500).json({ error: "Failed to generate signed URL" });
    }
  }
);

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});

// middleware function: request, response, and next.
// to call next function if the user who sent the request is logged in. Confer how Clerk verifies the user is logged in
