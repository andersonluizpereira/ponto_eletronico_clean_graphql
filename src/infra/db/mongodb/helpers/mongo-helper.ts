import { MongoClient, Collection } from 'mongodb'

export const MongoHelper = {
  client: null as any as MongoClient,
  uri: null as any as string,

  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  },

  async getCollection (name: string): Promise<Collection> {
    await this.connect(this.uri)
    return this.client.db().collection(name)
  },

  map: (data: any): any => {
    const { _id, ...rest } = data
    return Object.assign({}, rest, { id: _id })
  },

  mapCollection: (collection: any[]): any[] => {
    return collection.map(c => MongoHelper.map(c))
  }
}
