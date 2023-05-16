import {Events, EventTypes} from "@/events";
import {LocalRepository} from "@/repositories/local_repository";

const events: Events = new Events();
const localRepository: LocalRepository = new LocalRepository(events, EventTypes.metric, `${process.cwd()}/data/events.json`);

events.subscribe(EventTypes.metric, (data: any) => {
    console.log(data)
});

localRepository.createEvents();