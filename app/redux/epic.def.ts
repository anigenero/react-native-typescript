import { SchedulerLike } from 'rxjs';

export interface IDependencies {
    readonly scheduler: SchedulerLike;
}
