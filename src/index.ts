import {Event} from "@/lib/entities/metric_event";
import {EventsCommunication} from "@/events_communication";
import {getMetric} from "@/metrics";
import {
    EventTypes,
} from "@/lib/entities/event_data_source";
import {filterEvent} from "@/filters";
import {aggregate} from "@/aggregator";
import {loadRepository} from "@/data_source";

(async () => {
    const metric = getMetric();
    const passedEvents: Event[] = [];

    const events: EventsCommunication = new EventsCommunication();
    const repository = loadRepository(events, metric.eventsDataSource);

    events.subscribe(EventTypes.metric, eventHandler);
    events.onComplete(onComplete);

    const loadedEvents = await repository.load();

    function eventHandler(event: Event) {
        const isPassed = filterEvent(metric.filter, event);

        if (isPassed)
            passedEvents.push(event);
    }

    function onComplete() {
        const result = aggregate(metric.aggregationMethod, passedEvents);

        output(result);
    }
})()

function output(result: number | null) {
    console.log(result);
}