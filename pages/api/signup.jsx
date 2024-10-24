import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs'; // Asegúrate de tener bcryptjs instalado

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password, name, city, address } = req.body;
    console.log(email + " " + password);
    console.log(name + " " + city + " " + address);

    if (!email || !password) {
      return res.status(400).json({ error: 'Por favor, ingrese todos los campos.' });
    }

    try {
      // Verificar si el usuario ya existe
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({ error: 'El usuario ya está registrado.' });
      }

      // Encriptar la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Crear nuevo usuario
      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          city,
          adress : address
        },
      });

      // Devolver el ID del usuario recién creado
      res.status(201).json({ userId: newUser.id });
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      res.status(500).json({ error: 'Error en el servidor. Intente más tarde.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
