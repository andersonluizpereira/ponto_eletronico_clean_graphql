import faker from 'faker'
import { AddUsuarioInput, LoadUsuarioOutput } from '@/domain/usecases/usuario/add-usuario/incluir-usuario'
import { Usuario } from '@/domain/entities'
import { AuthenticationInput, UsuarioAuthenticationOutput } from '@/domain/usecases/usuario/authentication-usuario/authentication-usuario'

const obterCamposUsuario = new Usuario(
  faker.random.uuid(),
  faker.name.findName(),
  '839.435.452-10',
  '286833931',
  new Date(faker.date.past()),
  faker.phone.phoneNumber(),
  'any_token_acesso',
  faker.random.boolean(),
  faker.internet.email(),
  faker.internet.password()).obterCampos()

export const mockAddUsuarioParams = (): AddUsuarioInput => {
  return obterCamposUsuario
}

export const mockUsuarioModel = (): LoadUsuarioOutput | null => {
  return obterCamposUsuario
}

export const mockAuthenticationOutput = (): UsuarioAuthenticationOutput => {
  return {
    tokenAcesso: obterCamposUsuario.tokenAcesso,
    nome: obterCamposUsuario.nome
  }
}

export const mockAuthenticationIntput = (): AuthenticationInput => {
  return {
    email: obterCamposUsuario.email,
    password: obterCamposUsuario.password
  }
}
