import { LogErrorRepository } from '@/data/protocols/db'
import { LogInput } from '@/domain/usecases'

export class LogErrorRepositorySpy implements LogErrorRepository {
  stack!: string

  async logError (logInput: LogInput): Promise<void> {
    this.stack = logInput.stack
    return Promise.resolve()
  }
}
