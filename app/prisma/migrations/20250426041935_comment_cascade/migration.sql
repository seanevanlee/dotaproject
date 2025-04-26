-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_heroPostId_fkey";

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_heroPostId_fkey" FOREIGN KEY ("heroPostId") REFERENCES "HeroPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;
