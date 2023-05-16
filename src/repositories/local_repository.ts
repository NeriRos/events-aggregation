import {Events, EventTypes} from "@/events";
import {Event} from "@/lib/entities/metric_event";
import {EventsRepository} from "@/repositories/events_repository";
import * as fs from "fs";

export class LocalRepository extends EventsRepository {
    constructor(events: Events, eventType: EventTypes, private filePath: string) {
        super(events, eventType);
    }

    async createEvents() {
        const events = await this.loadFile();

        events.forEach(event => {
            this.create(event);
        });
    }

    async loadFile(): Promise<Event[]> {
        const promise = new Promise<Event[]>((resolve, reject) => {
            fs.readFile(this.filePath, (err, data) => {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                resolve(JSON.parse(data.toString()));
            });
        })

        return await promise;
    }
}