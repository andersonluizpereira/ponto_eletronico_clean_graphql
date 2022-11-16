import { makeDbAuthentication, makeIncluirUsuarioValidation, makeLogControllerDecorator, makeDbIncluirUsuario } from '@/main/factories'
import { IncluirUsuarioController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeIncluirUsuarioController = (): Controller => {
  const controller = new IncluirUsuarioController(makeDbIncluirUsuario(), makeIncluirUsuarioValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}
