import {Events, EventTypes} from "@/events";

console.log('Hello World')

const events: Events = new Events();

events.subscribe(EventTypes.metric, (data: any) => {

});