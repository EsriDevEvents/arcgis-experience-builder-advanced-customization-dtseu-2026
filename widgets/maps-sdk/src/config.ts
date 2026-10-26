import type { ImmutableObject } from 'seamless-immutable'

export interface Config {
  assistantHeading?: string
}

export type IMConfig = ImmutableObject<Config>
