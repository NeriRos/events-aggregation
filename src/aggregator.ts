import {AggregationMethod, Event} from "@/lib/entities/metric_event";

export function aggregate(method: AggregationMethod, events: Event[]): number | null {
    const data = events.map(event => event.data[method.field]);

    try {
        switch (method.operator) {
            case "average":
                return data.reduce((a, b) => a + b, 0) / data.length;
            case "sum":
                return data.reduce((a, b) => a + b, 0);
            case "min":
                return Math.min(...data);
            case "max":
                return Math.max(...data);
        }
    } catch (e) {
        return null
    }
}