import { Decrypter } from '@/data/protocols/criptography'
import { LoadUsuarioByTokenRepository } from '@/data/protocols/db'
import { LoadUsuarioByTokenInput, LoadUsuarioOutput } from '@/domain/usecases'

export class DbLoadUsuarioByToken implements LoadUsuarioByTokenRepository {
  constructor (private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadUsuarioByTokenRepository
  ) {
  }

  async load (loadUsuarioByTokenInput: LoadUsuarioByTokenInput): Promise<LoadUsuarioOutput | null> {
    const { accessToken } = loadUsuarioByTokenInput
    let token: string
    try {
      token = await this.decrypter.decrypt(accessToken) as any
    } catch (error) {
      return null
    }
    if (token) {
      const account = await this.loadAccountByTokenRepository.load(loadUsuarioByTokenInput)
      if (account) {
        return account
      }
    }
    return null
  }
}
