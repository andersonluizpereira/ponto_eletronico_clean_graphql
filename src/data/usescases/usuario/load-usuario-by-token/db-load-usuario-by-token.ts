import { Decrypter } from '@/data/protocols/criptography'
import { LoadUsuarioByTokenRepository } from '@/data/protocols/db'
import { LoadUsuarioByTokenInput, LoadUsuarioOutput } from '@/domain/usecases'

export class DbLoadUsuarioByToken implements LoadUsuarioByTokenRepository {
  constructor (private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadUsuarioByTokenRepository
  ) {
  }

  async loadByToken (loadUsuarioByTokenInput: LoadUsuarioByTokenInput): Promise<LoadUsuarioOutput | null> {
    const { tokenAcesso } = loadUsuarioByTokenInput
    let token: string
    try {
      token = await this.decrypter.decrypt(tokenAcesso) as any
    } catch (error) {
      return null
    }
    if (token) {
      const usuario = await this.loadAccountByTokenRepository.loadByToken(loadUsuarioByTokenInput)
      if (usuario) {
        return usuario
      }
    }
    return null
  }
}
