import { AddUsuarioRepository, LoadUsuarioByEmailRepository, LoadUsuarioByTokenRepository, UpdateUsuarioAccessTokenRepository } from '@/data/protocols/db'
import { AddUsuarioInput, LoadUsuarioOutput, LoadUsuarioByEmailInput, LoadUsuarioByTokenInput, UpdateUsuarioAccessTokenInput } from '@/domain/usecases'

import { mockUsuarioModel } from '@/tests/data/mocks/models/mock-usuario'

export class AddUsuarioRepositorySpy implements AddUsuarioRepository {
  usuarioModel = mockUsuarioModel()
  addUsuarioParams: AddUsuarioInput | undefined

  async add (data: AddUsuarioInput): Promise<AddUsuarioInput | null> {
    this.addUsuarioParams = data
    return Promise.resolve(this.usuarioModel)
  }
}
export class LoadUsuarioByEmailRepositorySpy implements LoadUsuarioByEmailRepository {
  usuarioModel = mockUsuarioModel()
  email!: string

  async loadByEmail (loadUsuarioByEmailInput: LoadUsuarioByEmailInput): Promise<LoadUsuarioOutput | null> {
    const { email } = loadUsuarioByEmailInput
    this.email = email
    return Promise.resolve(this.usuarioModel)
  }
}

export class LoadUsuarioByTokenRepositorySpy implements LoadUsuarioByTokenRepository {
  usuarioModel = mockUsuarioModel()
  tokenAcesso!: string
  role?: string

  async loadByToken (loadUsuarioByTokenInput: LoadUsuarioByTokenInput): Promise<AddUsuarioInput | null> {
    const { tokenAcesso, role } = loadUsuarioByTokenInput
    this.tokenAcesso = tokenAcesso
    this.role = role
    return Promise.resolve(this.usuarioModel)
  }
}

export class UpdateUsuarioAccessTokenRepositorySpy implements UpdateUsuarioAccessTokenRepository {
  id!: string
  tokenAcesso!: string

  async update (updateUsuarioAccessTokenInput: UpdateUsuarioAccessTokenInput): Promise<void> {
    this.id = updateUsuarioAccessTokenInput.id
    this.tokenAcesso = updateUsuarioAccessTokenInput.tokenAcesso
    return Promise.resolve()
  }
}
