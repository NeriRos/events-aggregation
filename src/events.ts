import {Event} from "@/lib/entities/metric-event";

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
    }

    publish(eventType: EventTypes, event: Event) {
        this.events.push(event);

        if (!this.listeners[eventType]) {
            return;
        }

        this.listeners[eventType].forEach(callback => {
            callback.call(null, event);
        });
    }
}