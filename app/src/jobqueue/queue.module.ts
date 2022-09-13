import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { createWorkers } from '../workers/filter-annot.main';
import { FilterAnnotJobQueue } from './queue/filter-annot.queue';
import { NatsModule } from '../nats/nats.module';
import { JobCompletedPublisher } from '../nats/publishers/job-completed-publisher';

@Module({
  imports: [NatsModule],
  providers: [FilterAnnotJobQueue],
  exports: [FilterAnnotJobQueue],
})
export class QueueModule implements OnModuleInit {
  @Inject(JobCompletedPublisher) jobCompletedPublisher: JobCompletedPublisher;
  async onModuleInit() {
    await createWorkers(this.jobCompletedPublisher);
  }
}
