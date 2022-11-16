import { Hasher } from '@/data/protocols/criptography'
import { AddUsuarioRepository, LoadUsuarioByEmailRepository } from '@/data/protocols/db'
import { AddUsuarioInput, LoadUsuarioByEmailInput, LoadUsuarioOutput, IncluirUsuario } from '@/domain/usecases'

export class DbAddUsuario implements IncluirUsuario {
  constructor (
    private readonly hasher: Hasher,
    private readonly addUsuarioRepository: AddUsuarioRepository,
    private readonly loadUsuarioByEmailRepository: LoadUsuarioByEmailRepository
  ) {}

  async add (usuarioData: AddUsuarioInput): Promise<LoadUsuarioOutput> {
    const { email, password } = usuarioData
    const loadUsuarioByEmailInput: LoadUsuarioByEmailInput = { email } as any
    const usuario = await this.loadUsuarioByEmailRepository.loadByEmail(loadUsuarioByEmailInput)

    if (!usuario) {
      const hashedPassword = await this.hasher.hash(password as any)
      const newUsuario = await this.addUsuarioRepository.add(Object.assign({}, usuarioData, { tokenAcesso: hashedPassword, password: hashedPassword }))
      return newUsuario
    }
    return null as any
  }
}
