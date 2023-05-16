import {Events, EventTypes} from "@/events";
import {Event} from "@/lib/entities/metric_event";

class MockEvents extends Events {
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
        }
    };

    beforeEach(function () {
        events = new MockEvents();
    });

    it('should publish an event', function () {
        events.publish(EventTypes.metric, testEvent);
        expect(events.getEvents()).toContain(testEvent);
    });

    it('should subscribe to an event', function () {
        events.subscribe(EventTypes.metric, (event: Event) => {
            expect(event).toEqual(testEvent);
        });
        events.publish(EventTypes.metric, testEvent);
    });
});