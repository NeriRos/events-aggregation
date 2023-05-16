import {Events} from "@/events";
import {Event} from "@/lib/entities/metric_event";

export abstract class EventsRepository {
    protected constructor(protected events: Events, protected eventType: EventTypes) {
    }

    async create(item: Event): Promise<boolean> {
        return this.events.publish(this.eventType, item);
    }
}