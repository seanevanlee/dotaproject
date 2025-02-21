import { PrismaClient } from "@prisma/client";

// seed data for prisma
const prisma = new PrismaClient();

// async code with await
await prisma.user.upsert({
  create: { username: "seanlee" },
  update: {},
  where: { username: "seanlee" },
});
await prisma.heroPost.upsert({
  create: {
    name: "cool hero",
    photoUrl: "https://i.imgur.com/NK6Ofjs.jpeg",
    ultimate: "does cool stuff",
    user: {
      connect: { username: "seanlee" },
    },
  },
  update: {},
  where: { name: "cool hero" },
});
