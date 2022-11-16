import { AddUsuarioRepository, LoadUsuarioByEmailRepository, LoadUsuarioByTokenRepository, UpdateUsuarioAccessTokenRepository } from '@/data/protocols/db'
import { AddUsuarioInput, LoadUsuarioOutput, LoadUsuarioByEmailInput, LoadUsuarioByTokenInput, UpdateUsuarioAccessTokenInput, LoadUsuarioByToken, LoadUsuarioByTokenOutput, UsuarioAuthentication, AuthenticationInput, UsuarioAuthenticationOutput, IncluirUsuario } from '@/domain/usecases'

import { mockUsuarioModel } from '@/tests/data/mocks/models/mock-usuario'
export class AddUsuarioRepositorySpy implements AddUsuarioRepository {
  usuarioModel = mockUsuarioModel()
  addUsuarioParams: AddUsuarioInput | undefined

  async add (data: AddUsuarioInput): Promise<AddUsuarioInput> {
    this.addUsuarioParams = data
    return Promise.resolve(this.usuarioModel)
  }
}

export class IncluirUsuarioSpy implements IncluirUsuario {
  usuarioModel = mockUsuarioModel()
  addUsuarioParams: AddUsuarioInput | undefined

  async add (usuario: AddUsuarioInput): Promise<AddUsuarioInput> {
    this.addUsuarioParams = usuario
    return Promise.resolve(mockUsuarioModel())
  }
}
export class LoadUsuarioByEmailRepositorySpy implements LoadUsuarioByEmailRepository {
  usuarioModel = mockUsuarioModel()
  email!: string

  async loadByEmail (loadUsuarioByEmailInput: LoadUsuarioByEmailInput): Promise<LoadUsuarioOutput> {
    const { email } = loadUsuarioByEmailInput
    this.email = email
    return Promise.resolve(this.usuarioModel)
  }
}

export class LoadUsuarioByTokenRepositorySpy implements LoadUsuarioByTokenRepository {
  usuarioModel = mockUsuarioModel()
  tokenAcesso!: string
  role?: string

  async loadByToken (loadUsuarioByTokenInput: LoadUsuarioByTokenInput): Promise<AddUsuarioInput> {
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

export class LoadUsuarioByTokenSpy implements LoadUsuarioByToken {
  usuarioModel = mockUsuarioModel()
  tokenAcesso!: string
  role?: string

  async loadByToken (loadUsuarioByTokenInput: LoadUsuarioByTokenInput): Promise<LoadUsuarioByTokenOutput> {
    this.tokenAcesso = loadUsuarioByTokenInput.tokenAcesso
    this.role = loadUsuarioByTokenInput.role
    return Promise.resolve(this.usuarioModel)
  }
}
export class AuthenticationSpy implements UsuarioAuthentication {
  authenticationInput?: AuthenticationInput
  authenticationModel = {
    tokenAcesso: '21729978-8b64-4db5-bc15-e49517767319',
    nome: 'Tami Bartell'
  }

  async auth (authenticationInput: AuthenticationInput): Promise<UsuarioAuthenticationOutput> {
    this.authenticationInput = authenticationInput
    return this.authenticationModel
  }
}
