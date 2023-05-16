import {EventsCommunication} from "@/events_communication";
import {EVENTS_DATA_SOURCE_TYPE, EventsDataSource} from "@/lib/entities/event_data_source";
import {EventsRepository} from "@/lib/repositories/events_repository";
import {LocalRepository} from "@/lib/repositories/local_repository";

export function loadRepository(events: EventsCommunication, dataSource: EventsDataSource) {
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