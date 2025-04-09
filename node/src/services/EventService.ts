import { AppDataSource } from '../ormconfig';
import { Event } from '../entities/Event';
import grpcClient from '../grpc/client';

export class EventService {
  private eventRepo = AppDataSource.getRepository(Event);

  async createEvent(data: Partial<Event>) {
    const event = this.eventRepo.create(data);
    const saved = await this.eventRepo.save(event);

    grpcClient.ProcessEvent(
      {
        userId: saved.userId,
        type: saved.type,
        createdAt: saved.createdAt.toISOString(),
        metadata: JSON.stringify(saved.metadata),
      },
      (err: any, response: any) => {
        if (err) {
          console.error('Erro ao enviar evento via gRPC:', err);
        } else {
          console.log('Resposta gRPC:', response.message);
        }
      }
    );

    return saved;
  }
}
