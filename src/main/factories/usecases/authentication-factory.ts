import env from '@/main/config/env'
import { UsuarioAuthentication } from '@/domain/usecases'
import { UsuarioMongoRepository } from '@/infra/db/mongodb'
import { BcryptAdapter, JwtAdapter } from '@/infra/criptografy'
import { DbUsuarioAuthentication } from '@/data/usescases'

export const makeDbAuthentication = (): UsuarioAuthentication => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const usuarioMongoRepository = new UsuarioMongoRepository()
  return new DbUsuarioAuthentication(usuarioMongoRepository, bcryptAdapter, jwtAdapter, usuarioMongoRepository)
}
