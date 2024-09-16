import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const saveHeroes = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const data = req.body;
      const filePath = path.resolve('./data', 'heroesData.json'); // Ajusta la ruta según sea necesario
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
      res.status(200).json({ message: 'Data saved successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to save data' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default saveHeroes;
