import { Global, Module } from '@nestjs/common';
import { JobsFilterAnnotService } from './services/jobs.filter-annot.service';
import { JobsFilterAnnotController } from './controllers/jobs.filter-annot.controller';
import { QueueModule } from '../jobqueue/queue.module';
import { JobsFilterAnnotNoauthController } from './controllers/jobs.filter-annot.noauth.controller';

@Global()
@Module({
  imports: [QueueModule],
  controllers: [JobsFilterAnnotController, JobsFilterAnnotNoauthController],
  providers: [JobsFilterAnnotService],
  exports: [],
})
export class JobsModule {}
