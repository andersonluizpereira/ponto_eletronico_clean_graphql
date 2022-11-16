import { Encrypter, HashComparer } from '@/data/protocols/criptography'
import { LoadUsuarioByEmailRepository, UpdateUsuarioAccessTokenRepository } from '@/data/protocols/db'
import { AuthenticationInput, UsuarioAuthentication, UsuarioAuthenticationOutput } from '@/domain/usecases'

export class DbUsuarioAuthentication implements UsuarioAuthentication {
  constructor (
    private readonly loadUsuarioByEmailRepository: LoadUsuarioByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateUsuarioAccessTokenRepository: UpdateUsuarioAccessTokenRepository
  ) {}

  async auth (authenticationInput: AuthenticationInput): Promise<UsuarioAuthenticationOutput> {
    const usuario = await this.loadUsuarioByEmailRepository.loadByEmail(authenticationInput)
    if (usuario) {
      const { id, nome } = usuario as any
      const isValid = await this.hashComparer.compare(authenticationInput.password, usuario.password as any)
      if (isValid) {
        const tokenAcesso = await this.encrypter.encrypt(usuario.id as any)
        await this.updateUsuarioAccessTokenRepository.update({ id, tokenAcesso })
        return { tokenAcesso, nome }
      }
    }
    return null as any
  }
}
