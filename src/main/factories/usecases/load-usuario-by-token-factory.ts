import env from '@/main/config/env'
import { LoadUsuarioByToken } from '@/domain/usecases'

import { JwtAdapter } from '@/infra/criptografy'
import { UsuarioMongoRepository } from '@/infra/db/mongodb'
import { DbLoadUsuarioByToken } from '@/data/usescases'

export const makeDbLoadUsuarioByToken = (): LoadUsuarioByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const usuarioMongoRepository = new UsuarioMongoRepository()
  return new DbLoadUsuarioByToken(jwtAdapter, usuarioMongoRepository)
}
