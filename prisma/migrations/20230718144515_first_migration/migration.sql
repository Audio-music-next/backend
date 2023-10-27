-- CreateTable
CREATE TABLE "recordings" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "audio" TEXT NOT NULL,
    "date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "recordings_pkey" PRIMARY KEY ("id")
);
