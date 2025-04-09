import { Request, Response } from 'express';
import { EventService } from '../services/EventService';

const eventService = new EventService();

export const createEvent = async (req: Request, res: Response) => {
  try {
    const event = await eventService.createEvent(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
