-- CreateTable
CREATE TABLE "ProductOpinion" (
    "id" SERIAL NOT NULL,
    "opinion" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "userName" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "ProductOpinion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductOpinion" ADD CONSTRAINT "ProductOpinion_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
