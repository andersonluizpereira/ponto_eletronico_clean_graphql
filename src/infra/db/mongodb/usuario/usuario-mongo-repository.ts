import { AddUsuarioRepository, LoadUsuarioByEmailRepository, LoadUsuarioByTokenRepository, UpdateUsuarioAccessTokenRepository } from '@/data/protocols/db'
import { AddUsuarioInput, LoadUsuarioOutput, LoadUsuarioByEmailInput, LoadUsuarioByEmailOutput, LoadUsuarioByTokenInput, UpdateUsuarioAccessTokenInput } from '@/domain/usecases'

import { MongoHelper } from '@/infra/db/mongodb/helpers'

export class UsuarioMongoRepository implements AddUsuarioRepository, LoadUsuarioByEmailRepository, UpdateUsuarioAccessTokenRepository, LoadUsuarioByTokenRepository {
  async add (addUsuarioInput: AddUsuarioInput): Promise<LoadUsuarioOutput> {
    const usuarioCollection = await MongoHelper.getCollection('usuarios')
    const result = await usuarioCollection.insertOne(addUsuarioInput)
    return MongoHelper.map(result.ops[0])
  }

  async loadByEmail (loadUsuarioByEmailInput: LoadUsuarioByEmailInput): Promise<LoadUsuarioByEmailOutput> {
    const accountCollection = await MongoHelper.getCollection('usuarios')
    const usuario = await accountCollection.findOne({ email: loadUsuarioByEmailInput.email })
    return usuario && MongoHelper.map(usuario)
  }

  async update (updateUsuarioAccessTokenInput: UpdateUsuarioAccessTokenInput): Promise<void> {
    const usuarioCollection = await MongoHelper.getCollection('usuarios')
    await usuarioCollection.updateOne({
      _id: updateUsuarioAccessTokenInput.id
    }, {
      $set: {
        tokenAcesso: updateUsuarioAccessTokenInput.tokenAcesso
      }
    })
  }

  async loadByToken ({ tokenAcesso, role }: LoadUsuarioByTokenInput): Promise<LoadUsuarioOutput> {
    const usuarioCollection = await MongoHelper.getCollection('usuarios')
    const usuario = await usuarioCollection.findOne({
      tokenAcesso,
      $or: [{
        role
      }, {
        role: 'admin'
      }]
    })
    return usuario && MongoHelper.map(usuario)
  }
}
