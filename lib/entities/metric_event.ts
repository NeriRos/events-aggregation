import {EventsDataSource, EventTypes} from "./event_data_source";

export type Event = {
    id: string;
    timestamp: Date;
    data: any;
}

export type Metric = {
    eventsDataSource: EventsDataSource
    filter: Filter;
    aggregationMethod: AggregationMethod;
};

type Filter = {
    conditions: Condition[];
};

type Condition = {
    criterions: Criterion[];
}

const CRITERION_OPERATOR = {
    EQUALS: 'Equals',
    NOT_EQUALS: 'NotEquals',
    LARGER_THAN: 'LargerThan',
    CONTAINS: 'Contains',
} as const;

type CriterionOperator = typeof CRITERION_OPERATOR[keyof typeof CRITERION_OPERATOR];

export type Criterion = {
    field: string;
    value: any;
    operator: CriterionOperator;
};

const AGGREGATION_OPERATOR = {
    SUM: 'sum',
    AVERAGE: 'average',
    MIN: 'min',
    MAX: 'max',
} as const;

type AggregationOperator = typeof AGGREGATION_OPERATOR[keyof typeof AGGREGATION_OPERATOR];

export type AggregationMethod = {
    operator: AggregationOperator;
    field: string
};