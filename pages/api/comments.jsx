import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export default async function handler(req, res) {
  const { method } = req;

  if (method === 'GET') {
    console.log(req.query);
    const { productId } = req.query;
    const comments = await prisma.productOpinion.findMany({
      where: { productId: parseInt(productId) }
    });
    res.status(200).json(comments);
  } else if (method === 'POST') {
    const { opinion, rating, userName, productId } = req.body;
    const newComment = await prisma.productOpinion.create({
      data: {
        opinion,
        rating,
        userName,
        productId
      }
    });
    res.status(201).json(newComment);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
