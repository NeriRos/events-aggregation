import {Event} from "@/lib/entities/metric_event";

export enum EventTypes {
    metric = 'metric',
}

export class Events {
    protected events: Event[] = [];
    private listeners: { [eventType: string]: Function[] } = {};

    subscribe(eventType: EventTypes, callback: (data: any) => void) {
        if (!this.listeners[eventType])
            this.listeners[eventType] = [];

        this.listeners[eventType].push(callback);

        return true;
    }

    publish(eventType: EventTypes, event: Event) {
        this.events.push(event);

        if (!this.listeners[eventType]) {
            return true;
        }

        this.listeners[eventType].forEach(callback => {
            callback.call(null, event);
        });

        return true
    }
}