import {Criterion, CRITERION_OPERATOR, Event, Filter} from "@/lib/entities/metric_event";

export function filterEvent(filter: Filter, event: Event) {
    for (const condition of filter.conditions) {
        let criteriaPassed = false;

        for (const criterion of condition.criteria) {
            const passed = testCriteria(criterion, event);

            if (!passed)
                return false;
        }
    }

    return true;
}

export function testCriteria(criterion: Criterion, event: Event) {
    const value = event.data?.[criterion.field];

    if (!value) {
        return false;
    }

    switch (criterion.operator) {
        case CRITERION_OPERATOR.EQUALS:
            return criterion.value === value;
        case CRITERION_OPERATOR.NOT_EQUALS:
            return criterion.value !== value;
        case CRITERION_OPERATOR.CONTAINS:
            return value.includes(criterion.value);
        case CRITERION_OPERATOR.LARGER_THAN:
            return value > criterion.value;
    }

    return false;
}