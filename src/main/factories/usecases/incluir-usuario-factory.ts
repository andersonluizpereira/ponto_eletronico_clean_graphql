import { DbAddUsuario } from '@/data/usescases'
import { IncluirUsuario } from '@/domain/usecases'
import { BcryptAdapter } from '@/infra/criptografy'
import { UsuarioMongoRepository } from '@/infra/db/mongodb'

export const makeDbIncluirUsuario = (): IncluirUsuario => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const usuarioMongoRepository = new UsuarioMongoRepository()
  return new DbAddUsuario(bcryptAdapter, usuarioMongoRepository, usuarioMongoRepository)
}
