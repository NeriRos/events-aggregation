const EVENTS_DATA_SOURCE_TYPE = {
    LOCAL_FILE_PATH: 'localFilePath',
    S3: 's3',
    DB: 'db',
} as const;

interface LocalFileDataSourceConfig {
    path: string;
}

interface S3DataSourceConfig {
    url: string;
}

interface DbDataSourceConfig {
    connectionString: string;
    tableName: string;
}

type LocalFileDataSource = {
    type: typeof EVENTS_DATA_SOURCE_TYPE.LOCAL_FILE_PATH;
    config: LocalFileDataSourceConfig;
}

type S3DataSource = {
    type: typeof EVENTS_DATA_SOURCE_TYPE.S3;
    config: S3DataSourceConfig;
}

type DbDataSource = {
    type: typeof EVENTS_DATA_SOURCE_TYPE.DB;
    config: DbDataSourceConfig;
}

export type EventsDataSource = LocalFileDataSource | S3DataSource | DbDataSource;

export type EventsDataSourceType = typeof EVENTS_DATA_SOURCE_TYPE[keyof typeof EVENTS_DATA_SOURCE_TYPE];