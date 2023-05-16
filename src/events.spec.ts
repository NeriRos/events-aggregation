import {EventsCommunication} from "@/events_communication";
import {Event} from "@/lib/entities/metric_event";
import {EventTypes} from "@/lib/entities/event_data_source";

class MockEvents extends EventsCommunication {
    getEvents() {
        return this.events;
    }
}

describe('Events pub sub', function () {
    let events: MockEvents;
    const testEvent: Event = {
        id: 'test',
        timestamp: new Date(),
        data: {
            test: 'test',
        },
        type: EventTypes.metric,
    };

    beforeEach(function () {
        events = new MockEvents();
    });

    it('should publish an event', function () {
        events.publish(testEvent);
        expect(events.getEvents()).toContain(testEvent);
    });

    it('should subscribe to an event', function () {
        events.subscribe(EventTypes.metric, (event: Event) => {
            expect(event).toEqual(testEvent);
        });
        events.publish(testEvent);
    });
});