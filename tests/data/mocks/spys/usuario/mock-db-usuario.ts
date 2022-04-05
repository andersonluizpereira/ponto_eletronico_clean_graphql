import { AddUsuarioRepository, LoadUsuarioByEmailRepository, LoadUsuarioByTokenRepository } from '@/data/protocols/db'
import { AddUsuarioParams, LoadUsuarioParams } from '@/domain/usecases/usuario/add-usuario/incluir-usuario'

import { mockUsuarioModel } from '@/tests/data/mocks/models/mock-usuario'

export class AddUsuarioRepositorySpy implements AddUsuarioRepository {
  usuarioModel = mockUsuarioModel()
  addUsuarioParams: AddUsuarioParams | undefined

  async add (data: AddUsuarioParams): Promise<AddUsuarioParams | null> {
    this.addUsuarioParams = data
    return Promise.resolve(this.usuarioModel)
  }
}
export class LoadUsuarioByEmailRepositorySpy implements LoadUsuarioByEmailRepository {
  usuarioModel = mockUsuarioModel()
  email!: string

  async loadByEmail (email: string): Promise<LoadUsuarioParams | null> {
    this.email = email
    return Promise.resolve(this.usuarioModel)
  }
}

export class LoadUsuarioByTokenRepositorySpy implements LoadUsuarioByTokenRepository {
  usuarioModel = mockUsuarioModel()
  token!: string
  role?: string

  async loadByToken (token: string, role?: string): Promise<AddUsuarioParams | null> {
    this.token = token
    this.role = role
    return Promise.resolve(this.usuarioModel)
  }
}
