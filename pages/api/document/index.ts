// pages/api/document/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/db/mongodb';
import Document from '@/models/Document';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'POST') {
    const { title, content } = req.body;

    try {
      const doc = await Document.create({ title, content });
      return res.status(201).json(doc);
    } catch (err) {
      return res.status(400).json({ error: 'Failed to create document' });
    }
  }

  if (req.method === 'GET') {
    const docs = await Document.find().sort({ createdAt: -1 });
    return res.status(200).json(docs);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
