import { Hasher } from '@/data/protocols/criptography'
import { AddUsuarioRepository, LoadUsuarioByEmailRepository } from '@/data/protocols/db'
import { AddUsuarioParams, IncluirUsuario } from '@/domain/usecases'

export class DbAddUsuario implements IncluirUsuario {
  constructor (
    private readonly hasher: Hasher,
    private readonly addUsuarioRepository: AddUsuarioRepository,
    private readonly loadUsuarioByEmailRepository: LoadUsuarioByEmailRepository
  ) {}

  async add (usuarioData: AddUsuarioParams): Promise<AddUsuarioParams | null> {
    const { email, password } = usuarioData
    const usuario = await this.loadUsuarioByEmailRepository.loadByEmail(email!)
    if (!usuario) {
      const hashedPassword = await this.hasher.hash(password!)
      const newAccount = await this.addUsuarioRepository.add(Object.assign({}, usuarioData, { password: hashedPassword }))
      return newAccount
    }
    return null
  }
}
