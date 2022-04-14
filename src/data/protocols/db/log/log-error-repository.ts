import { LogInput } from '@/domain/usecases'

export interface LogErrorRepository {
  logError: (logInput: LogInput) => Promise<void>
}
