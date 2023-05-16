import {Event} from "@/lib/entities/metric_event";
import {LocalRepository} from "@/lib/repositories/local_repository";
import {EventsCommunication} from "@/events_communication";
import {getMetric} from "@/metrics";
import {
    EVENTS_DATA_SOURCE_TYPE, EventsDataSource,
    EventTypes,
} from "@/lib/entities/event_data_source";
import {EventsRepository} from "@/lib/repositories/events_repository";
import {filterEvent} from "@/filters";
import {aggregate} from "@/aggregator";

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

function loadRepository(events: EventsCommunication, dataSource: EventsDataSource) {
    let repository: EventsRepository;

    switch (dataSource.type) {
        case EVENTS_DATA_SOURCE_TYPE.LOCAL_FILE_PATH:
            repository = new LocalRepository(events, dataSource.config.path);
            break;
        default:
            throw new Error('Not implemented');
    }

    return repository
}

function output(result: number | null) {
    console.log(result);
}