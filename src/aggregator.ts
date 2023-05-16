import {AGGREGATION_OPERATOR, AggregationMethod, Event} from "@/lib/entities/metric_event";

export function aggregate(method: AggregationMethod, events: Event[]): number | null {
    const data = events.map(event => event.data[method.field]);


    switch (method.operator) {
        case AGGREGATION_OPERATOR.AVERAGE:
            return data.reduce((a, b) => a + b, 0) / data.length;
        case AGGREGATION_OPERATOR.SUM:
            return data.reduce((a, b) => a + b, 0);
        case AGGREGATION_OPERATOR.MIN:
            return Math.min(...data);
        case AGGREGATION_OPERATOR.MAX:
            return Math.max(...data);
    }

}