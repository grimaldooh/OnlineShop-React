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
          totalPrice: currentOrder.totalPrice,
          date: new Date(currentOrder.date),
          user: {
            connect: { id: userId },
          },
          products: {
            create: currentOrder.products.map(product => ({
              title: product.title,
              price: product.price,
              description: product.description,
              image: product.image,
            })),
          },
        },
        include: {
          products: true,
        },
      });

      console.log('Nueva orden creada:', newOrder);
      res.status(201).json(newOrder);
    } catch (error) {
      console.error('Error al guardar la orden:', error);
      res.status(500).json({ error: 'Error al procesar la orden.' });
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
