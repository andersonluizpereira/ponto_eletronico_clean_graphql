import faker from 'faker'
import { AddUsuarioParams, LoadUsuarioParams } from '@/domain/usecases/usuario/add-usuario/incluir-usuario'
import { Usuario } from '@/domain/entities'

export const mockAddUsuarioParams = (): AddUsuarioParams => {
  const usuario = new Usuario(
    faker.random.uuid(),
    faker.name.findName(),
    '839.435.452-10',
    '286833931',
    new Date(faker.date.past()),
    faker.phone.phoneNumber(),
    'any_token_acesso',
    faker.random.boolean(),
    faker.internet.email(),
    faker.internet.password())
  return usuario.obterCampos()
}

export const mockUsuarioModel = (): LoadUsuarioParams | null => {
  const usuario = new Usuario(
    faker.random.uuid(),
    faker.name.findName(),
    '839.435.452-10',
    '286833931',
    new Date(faker.date.past()),
    faker.phone.phoneNumber(),
    'any_token_acesso',
    faker.random.boolean(),
    faker.internet.email(),
    faker.internet.password())
  return usuario.obterCampos()
}
