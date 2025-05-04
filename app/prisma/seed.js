import { PrismaClient } from "@prisma/client";

// seed data for prisma
const prisma = new PrismaClient();

// async code with await
await prisma.user.upsert({
  create: {
    username: "bagelwrangler",
    idInClerk: "user_2t9G1pJmPcMOxMUUzog4kmyZHoy",
  },
  update: {},
  where: {
    username: "bagelwrangler",
    idInClerk: "user_2t9G1pJmPcMOxMUUzog4kmyZHoy",
  },
});

await prisma.user.upsert({
  create: {
    username: "misteroh",
    idInClerk: "user_2wIHqYMU0AUw9GSHykFaDwsjafc",
  },
  update: {},
  where: {
    username: "misteroh",
    idInClerk: "user_2wIHqYMU0AUw9GSHykFaDwsjafc",
  },
});

await prisma.heroPost.upsert({
  create: {
    name: "cool hero",
    photoUrl: "https://i.imgur.com/NK6Ofjs.jpeg",
    ultimate: "does cool stuff",
    primaryAttribute: "STRENGTH",
    attackType: "MELEE",
    user: {
      connect: {
        username: "bagelwrangler",
      },
    },
  },
  update: {},
  where: { name: "cool hero" },
});
