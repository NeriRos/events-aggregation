import {Events} from "@/events";
import {Event} from "@/lib/entities/metric_event";

export abstract class EventsRepository {
    protected constructor(protected events: Events) {
    }

    async create(item: Event): Promise<boolean> {
        return this.events.publish(item);
    }

    async load(): Promise<Event[] | Error | null> {
        throw new Error('Not implemented');
    }
}