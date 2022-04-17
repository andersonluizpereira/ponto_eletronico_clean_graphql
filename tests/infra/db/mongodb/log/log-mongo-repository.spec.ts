import { LogMongoRepository } from '@/infra/db/mongodb'
import { MongoHelper } from '@/infra/db/mongodb/helpers'

import { Collection } from 'mongodb'
import faker from 'faker'
import { LogInput } from '@/domain/usecases'

const makeSut = (): LogMongoRepository => {
  return new LogMongoRepository()
}

describe('LogMongoRepository', () => {
  let errorCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as any)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.deleteMany({})
  })

  test('Should create an error log on success', async () => {
    const sut = makeSut()
    const logInput: LogInput = { stack: faker.random.words() }
    await sut.logError(logInput)
    const count = await errorCollection.countDocuments()
    expect(count).toBe(1)
  })
})
