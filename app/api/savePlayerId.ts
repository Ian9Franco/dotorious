// pages/api/savePlayerId.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import path from 'path';

// Tipo para el cuerpo de la solicitud
interface SavePlayerIdRequestBody {
  playerId: string;
  userId: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { playerId, userId }: SavePlayerIdRequestBody = req.body;
    
    try {
      // Ruta del archivo
      const filePath = path.join(process.cwd(), 'data', 'players_id.tsx');
      
      // Contenido del archivo
      const fileContent = `export const playersId = { "${userId}": "${playerId}" };`;
      
      // Escribir el archivo
      await fs.writeFile(filePath, fileContent, 'utf8');
      
      // Enviar respuesta
      res.status(200).json({ message: 'Player ID saved successfully' });
    } catch (error) {
      console.error('Error saving player ID:', error);
      res.status(500).json({ error: 'Failed to save player ID' });
    }
  } else {
    // Método no permitido
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
