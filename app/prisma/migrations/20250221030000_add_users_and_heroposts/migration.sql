-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HeroPost" (
    "id" SERIAL NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ultimate" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "HeroPost_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "HeroPost_photoUrl_key" ON "HeroPost"("photoUrl");

-- CreateIndex
CREATE UNIQUE INDEX "HeroPost_name_key" ON "HeroPost"("name");

-- AddForeignKey
ALTER TABLE "HeroPost" ADD CONSTRAINT "HeroPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
