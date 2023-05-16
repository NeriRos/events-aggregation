import {Event, Filter, Metric} from "@/lib/entities/metric_event";
import {EventTypes} from "@/lib/entities/event_data_source";
import {filterEvent, testCriteria} from "@/filters";
import {getMetric} from "@/metrics";
import {aggregate} from "@/aggregator";

describe('Aggregator', function () {
    const testEvents: Event[] = [{
        id: 'test',
        timestamp: new Date(),
        data: {
            amountPaid: 4,
        },
        type: EventTypes.metric,
    }, {
        id: 'test',
        timestamp: new Date(),
        data: {
            amountPaid: 10,
        },
        type: EventTypes.metric,
    }, {
        id: 'test',
        timestamp: new Date(),
        data: {
            amountPaid: 20,
        },
        type: EventTypes.metric,
    }];

    const metric = getMetric();

    it('aggregate amountPaid averages 15', function () {
        const average = aggregate(metric.aggregationMethod, testEvents);

        expect(average).toEqual(15);
    });
});