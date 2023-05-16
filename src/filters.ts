import {Criterion, Event, Filter} from "@/lib/entities/metric_event";

export function filterEvent(filter: Filter, event: Event) {
    filter.conditions.forEach(condition => {
        condition.criterions.forEach(criterion => {
            const passed = testCriteria(criterion, event);

            if (!passed)
                return false;
        });
    });

    return true;
}

export function testCriteria(criterion: Criterion, event: Event) {
    const value = event.data?.[criterion.field];

    if (!value) {
        return false;
    }

    switch (criterion.operator) {
        case "Equals":
            return criterion.value === value;
        case "NotEquals":
            return criterion.value !== value;
        case "Contains":
            return value.includes(criterion.value);
        case "LargerThan":
            return value > criterion.value;
    }

    return false;
}