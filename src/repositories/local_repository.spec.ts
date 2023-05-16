import {Events, EventTypes} from "@/events";
import {Event} from "@/lib/entities/metric_event";
import * as fs from "fs";
import {LocalRepository} from "@/repositories/local_repository";
import * as path from "path";

class MockEvents extends Events {
    getEvents() {
        return this.events;
    }
}

describe('Local repository', function () {
    let events: MockEvents;
    let localRepository: LocalRepository;

    const testEventDataPath = path.resolve(`${process.cwd()}/data/events.json`);
    const eventsData: Event[] = JSON.parse(fs.readFileSync(testEventDataPath).toString())

    beforeEach(function () {
        events = new MockEvents();
        localRepository = new LocalRepository(events, EventTypes.metric, testEventDataPath);
    });

    it('should publish all events', async function () {
        await localRepository.createEvents();

        expect(events.getEvents().length).toEqual(eventsData.length);
    });
});