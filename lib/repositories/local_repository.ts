import {EventsCommunication} from "@/events_communication";
import {Event} from "@/lib/entities/metric_event";
import * as fs from "fs";
import {EventsRepository} from "@/lib/repositories/events_repository";

export class LocalRepository extends EventsRepository {
    constructor(events: EventsCommunication, private filePath: string) {
        super(events);
    }

    async load(): Promise<Event[] | Error> {
        return new Promise((resolve, reject) => {
            fs.readFile(this.filePath, (err, data) => {
                if (err) {
                    console.error(err);
                    reject(err);
                }

                const events: Event[] = JSON.parse(data.toString())

                events.forEach(event => {
                    this.create(event);
                });

                resolve(events);
            });
        });
    }
}