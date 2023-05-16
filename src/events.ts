import {Event} from "@/lib/entities/metric_event";
import {EventTypes} from "@/lib/entities/event_data_source";

export class Events {
    protected events: Event[] = [];
    private listeners: { [eventType: string]: Function[] } = {};

    subscribe(eventType: EventTypes, callback: (data: Event) => void) {
        if (!this.listeners[eventType])
            this.listeners[eventType] = [];

        this.listeners[eventType].push(callback);

        return true;
    }

    publish(event: Event) {
        this.events.push(event);

        if (!this.listeners[event.type]) {
            return true;
        }

        this.listeners[event.type].forEach(callback => {
            callback.call(null, event);
        });

        return true
    }
}