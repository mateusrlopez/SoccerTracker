-- CreateTable
CREATE TABLE "stadiums" (
    "id" UUID NOT NULL,
    "name" VARCHAR NOT NULL,
    "country" VARCHAR NOT NULL,
    "capacity" DOUBLE PRECISION NOT NULL,
    "foundation_date" DATE NOT NULL,

    CONSTRAINT "stadiums_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "stadiums_name_key" ON "stadiums"("name");
