import {EventsCommunication} from "@/events_communication";
import {Event} from "@/lib/entities/metric_event";

export abstract class EventsRepository {
    protected constructor(protected events: EventsCommunication) {
    }

    async create(item: Event): Promise<boolean> {
        return this.events.publish(item);
    }

    async load(): Promise<Event[] | Error | null> {
        throw new Error('Not implemented');
    }
}