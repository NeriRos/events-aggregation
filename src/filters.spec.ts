import {Event, Filter} from "@/lib/entities/metric_event";
import {EventTypes} from "@/lib/entities/event_data_source";
import {filterEvent, testCriteria} from "@/filters";

describe('Filters', function () {
    const testEvent: Event = {
        id: 'test',
        timestamp: new Date(),
        data: {
            test: 'test',
        },
        type: EventTypes.metric,
    };

    const filter: Filter = {
        conditions: [
            {
                criteria: [
                    {
                        field: 'test',
                        operator: 'Equals',
                        value: 'test',
                    }
                ]
            }
        ]
    }

    it('filter should pass', function () {
        const isPassed = filterEvent(filter, testEvent);

        expect(isPassed).toBe(true);
    });

    it('testCriteria should pass', function () {
        const isPassed = testCriteria(filter.conditions[0].criteria[0], testEvent);

        expect(isPassed).toBe(true);
    });
});