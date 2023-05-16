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

(async () => {
    const metric = getMetric();

    const events: EventsCommunication = new EventsCommunication();
    const repository = loadRepository(events, metric.eventsDataSource);

    events.subscribe(EventTypes.metric, eventHandler);
    await repository.load();

    function eventHandler(event: Event) {
        const isPassed = filterEvent(metric.filter, event);

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