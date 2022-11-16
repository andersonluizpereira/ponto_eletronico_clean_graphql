import { adaptResolver } from '@/main/adapters'
import { makeLoginController, makeIncluirUsuarioController } from '@/main/factories'

export default {
  Query: {
    login: async (parent: any, args: any) => adaptResolver(makeLoginController(), args)
  },

  Mutation: {
    incluirUsuario: async (parent: any, args: any) => adaptResolver(makeIncluirUsuarioController(), args)
  }
}
