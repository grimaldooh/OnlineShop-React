import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;

  if (method === 'GET') {
    const { userId, productId } = req.query;
    console.log('userId:', userId);
    console.log('productId:', productId);
    // Verificar si el usuario ha comprado este producto
    const orders = await prisma.order.findMany({
      
    });



    console.log('orders:', orders);

    orders.forEach(order => {
        console.log('order:', order.userId);
        console.log('userId:', userId);
      if(order.userId === parseInt(userId)){
        console.log('El usuario ha comprado este producto');
        res.status(200).json({ canComment: true });
      } 
    });

    res.status(200).json({ canComment: false });

  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
