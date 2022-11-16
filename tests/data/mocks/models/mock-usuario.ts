import faker from 'faker'
import { AddUsuarioInput, LoadUsuarioOutput } from '@/domain/usecases/usuario/add-usuario/incluir-usuario'
import { Usuario } from '@/domain/entities'
import { AuthenticationInput, UsuarioAuthenticationOutput } from '@/domain/usecases/usuario/authentication-usuario/authentication-usuario'

const obterCamposUsuario = new Usuario(
  faker.datatype.uuid(),
  'Tami Bartell',
  '839.435.452-10',
  '286833931',
  new Date('1985-02-22T19:15:10.856Z'),
  '5511965928203',
  'any_token_acesso',
  false,
  'andy2903.alp@gmail.com',
  'vl04yl7CNJO3n3q').obterCampos()

export const mockAddUsuarioParams = (): AddUsuarioInput => {
  return obterCamposUsuario
}

export const mockUsuarioModel = (): LoadUsuarioOutput => {
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
