import { LogErrorRepository } from '@/data/protocols/db'
import { LogInput } from '@/domain/usecases'
import { MongoHelper } from '@/infra/db/mongodb/helpers'

export class LogMongoRepository implements LogErrorRepository {
  async logError ({ stack }: LogInput): Promise<void> {
    const errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.insertOne({
      stack,
      date: new Date()
    })
  }
}
