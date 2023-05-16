import {Event, Metric} from "@/lib/entities/metric_event";
import {LocalRepository} from "@/lib/repositories/local_repository";
import {Events} from "@/events";
import {getMetric} from "@/metrics";
import {filter} from "@/filters";
import {
    EVENTS_DATA_SOURCE_TYPE, EventsDataSource,
    EventsDataSourceType,
    EventTypes,
} from "@/lib/entities/event_data_source";
import {EventsRepository} from "@/lib/repositories/events_repository";

(async () => {
    const metric = getMetric();

    const events: Events = new Events();
    const repository = loadRepository(events, metric.eventsDataSource);

    events.subscribe(EventTypes.metric, eventHandler);
    await repository.load();
})()

function eventHandler(event: Event, metric: Metric) {

}

function loadRepository(events: Events, dataSource: EventsDataSource) {
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