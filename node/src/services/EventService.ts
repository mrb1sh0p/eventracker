import { AppDataSource } from '../ormconfig';
import { Event } from '../entities/Event';

export class EventService {
  private eventRepo = AppDataSource.getRepository(Event);

  async createEvent(data: Partial<Event>) {
    const event = this.eventRepo.create(data);
    return await this.eventRepo.save(event);
  }
}
