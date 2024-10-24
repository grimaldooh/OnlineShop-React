import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, currentOrder, shippingInfo, paymentInfo } = req.body;
    const { name, address, city } = shippingInfo;

    if (!userId || !currentOrder) {
      return res.status(400).json({ error: 'Faltan datos para procesar la orden.' });
    }

    try {
      // Procesar o validar la información de envío y pago si es necesario
      // Por motivos de seguridad, es recomendable no almacenar información sensible como el CVV o el número completo de la tarjeta.

      // Crear nueva orden
      const newOrder = await prisma.order.create({
        data: {
          totalPrice: parseFloat(currentOrder.totalPrice), // Convertir a float
          date: new Date(currentOrder.date),
          user: {
            connect: { id: parseInt(userId) },
          },
          products: {
            create: currentOrder.products.map(product => ({
              title: product.title,
              price: product.price,
              description: product.description,
              image: product.image,
              quantity: product.quantity
            })),
          },
        },
        include: {
          products: true,
        },
      });

      // Crear registro de ShippingInfo vinculado a la nueva orden
      const newShippingInfo = await prisma.shippingInfo.create({
        data: {
          name: shippingInfo.name,
          address: shippingInfo.address,
          city: shippingInfo.city,
          cardNumber: paymentInfo.cardNumber, // Asegúrate de manejar esto de manera segura
          order: {
            connect: { id: newOrder.id },
          },
        },
      });

      console.log('Nueva orden creada:', newOrder);
      console.log('Nueva información de envío creada:', newShippingInfo);
      res.status(201).json({ newOrder, newShippingInfo });
    } catch (error) {
      console.error('Error al crear la orden:', error);
      res.status(500).json({ error: 'Error al crear la orden' });
    }
  } 
  else if (req.method === 'GET') {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'Falta el ID del usuario.' });
    }

    try {
      // Obtener las órdenes del usuario con sus productos asociados
      const userOrders = await prisma.order.findMany({
        where: {
          userId: parseInt(userId),
        },
        include: {
          products: true,
          shippingInfo: true,
        },
      });

      console.log('Órdenes encontradas para el usuario:', userOrders);
      if (userOrders.length === 0) {
        return res.status(404).json({ message: 'No se encontraron órdenes para este usuario.' });
      }

      res.status(200).json(userOrders);
    } catch (error) {
      console.error('Error al obtener las órdenes:', error);
      res.status(500).json({ error: 'Error al obtener las órdenes del usuario.' });
    }
  } 
  else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
