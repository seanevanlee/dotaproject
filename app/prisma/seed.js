import { PrismaClient } from "@prisma/client";

// seed data for prisma
const prisma = new PrismaClient();

// async code with await
await prisma.user.upsert({
  create: {
    username: "seanevanlee@gmail.com",
    idInClerk: "user_2t9G1pJmPcMOxMUUzog4kmyZHoy",
  },
  update: {},
  where: {
    username: "seanevanlee@gmail.com",
    idInClerk: "user_2t9G1pJmPcMOxMUUzog4kmyZHoy",
  },
});

await prisma.user.upsert({
  create: {
    username: "seanevanlee@csu.fullerton.edu",
    idInClerk: "user_2tvScedxo7WFnpblnqSE0gCD3jl",
  },
  update: {},
  where: {
    username: "seanevanlee@csu.fullerton.edu",
    idInClerk: "user_2tvScedxo7WFnpblnqSE0gCD3jl",
  },
});

await prisma.heroPost.upsert({
  create: {
    name: "cool hero",
    photoUrl: "https://i.imgur.com/NK6Ofjs.jpeg",
    ultimate: "does cool stuff",
    user: {
      connect: {
        username: "seanevanlee@gmail.com",
      },
    },
  },
  update: {},
  where: { name: "cool hero" },
});
