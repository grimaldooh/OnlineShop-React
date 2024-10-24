import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs'; // Asegúrate de instalar bcryptjs si no lo tienes: `npm install bcryptjs`

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Por favor, ingrese ambos campos.' });
    }

    try {
      // Buscar el usuario por email
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      // Si el usuario no existe o las contraseñas no coinciden
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Credenciales incorrectas.' });
      }

      // Si las credenciales son correctas, devolver el userId
      res.status(200).json({ userId: user.id });
    } catch (error) {
      console.error('Error en el login:', error);
      res.status(500).json({ error: 'Error en el servidor. Intente más tarde.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
