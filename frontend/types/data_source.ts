import { BaseSchema } from '@/types/base'

export interface CredentialsSchema {
  host: string
  username: string
  password: string
  db: string
  port: string
}

export enum DataSourceType {
  postgresql = 'POSTGRESQL',
  mysql = 'MYSQL',
}

export interface CheckConnectionSchema {
  credentials: CredentialsSchema
  type: DataSourceType | string
}

export interface AddDataSourceSchema extends CheckConnectionSchema {
  name: string
}

export interface CheckConnectionResult {
  connection_result: boolean
  connection_error?: string
}

export interface DataSource extends BaseSchema {
  credentials: CredentialsSchema,
  id: number,
  created_by_id: number,
  name: string,
  type: DataSourceType
}
