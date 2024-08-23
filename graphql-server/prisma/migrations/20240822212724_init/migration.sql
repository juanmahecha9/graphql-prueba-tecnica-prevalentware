-- AddForeignKey
ALTER TABLE "movement_tbl" ADD CONSTRAINT "movement_tbl_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_tbl"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
