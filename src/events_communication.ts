import {Event} from "@/lib/entities/metric_event";
import {EventTypes} from "@/lib/entities/event_data_source";

export class EventsCommunication {
    protected events: Event[] = [];
    private listeners: { [eventType: string]: Function[] } = {};

    private onCompleteFunction: Function = () => {
    };

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

    onComplete(callback: (events: Event[]) => void) {
        this.onCompleteFunction = callback;
    }

    end() {
        return this.onCompleteFunction.call(null, this.events);
    }
}