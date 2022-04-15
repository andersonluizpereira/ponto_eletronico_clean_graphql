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

  async load (loadUsuarioByEmailInput: LoadUsuarioByEmailInput): Promise<LoadUsuarioOutput | null> {
    const { email } = loadUsuarioByEmailInput
    this.email = email
    return Promise.resolve(this.usuarioModel)
  }
}

export class LoadUsuarioByTokenRepositorySpy implements LoadUsuarioByTokenRepository {
  usuarioModel = mockUsuarioModel()
  accessToken!: string
  role?: string

  async load (loadUsuarioByTokenInput: LoadUsuarioByTokenInput): Promise<AddUsuarioInput | null> {
    const { accessToken, role } = loadUsuarioByTokenInput
    this.accessToken = accessToken
    this.role = role
    return Promise.resolve(this.usuarioModel)
  }
}

export class UpdateUsuarioAccessTokenRepositorySpy implements UpdateUsuarioAccessTokenRepository {
  id!: string
  token!: string

  async update (updateUsuarioAccessTokenInput: UpdateUsuarioAccessTokenInput): Promise<void> {
    this.id = updateUsuarioAccessTokenInput.id
    this.token = updateUsuarioAccessTokenInput.tokenAcesso
    return Promise.resolve()
  }
}
