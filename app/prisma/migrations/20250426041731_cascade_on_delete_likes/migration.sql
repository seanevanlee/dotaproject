-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_heroPostId_fkey";

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_heroPostId_fkey" FOREIGN KEY ("heroPostId") REFERENCES "HeroPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;
