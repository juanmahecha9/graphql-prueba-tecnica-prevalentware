-- CreateTable
CREATE TABLE "test_tbl" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "test_tbl_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_tbl" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "role" TEXT NOT NULL,
    "password" TEXT NOT NULL DEFAULT '1234',

    CONSTRAINT "user_tbl_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movement_tbl" (
    "id" TEXT NOT NULL,
    "concept" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "movement_tbl_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_tbl_email_key" ON "user_tbl"("email");
