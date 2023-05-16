import {Metric} from "@/lib/entities/metric_event";
import fs from "fs";

export function getMetric(): Metric {
    const metric: string = fs.readFileSync(`${process.cwd()}/data/metric.json`, 'utf8');

    return JSON.parse(metric);
}