import { AddUsuarioInput, IncluirUsuario, UsuarioAuthentication } from '@/domain/usecases'
import { EmailInUseError, PasswordsDoNotMatch } from '@/presentation/errors'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'

export class IncluirUsuarioController implements Controller {
  /**
   *
   */
  constructor (
    private readonly incluirUsuario: IncluirUsuario,
    private readonly validation: Validation,
    private readonly usuarioAuthentication: UsuarioAuthentication) {

  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)

      if (error) {
        return badRequest(error)
      }

      const {
        nome,
        cpf,
        rg,
        dataNascimento,
        telefone,
        tokenAcesso,
        estaAtivo,
        email,
        password,
        passwordConfirmation
      } = httpRequest.body

      if (password !== passwordConfirmation) {
        return badRequest(new PasswordsDoNotMatch())
      }

      const addUsuarioInput = {
        nome,
        cpf,
        rg,
        dataNascimento,
        telefone,
        tokenAcesso,
        estaAtivo,
        email,
        password
      } as AddUsuarioInput

      const account = await this.incluirUsuario.add(addUsuarioInput)

      if (!account) {
        return forbidden(new EmailInUseError())
      }

      const usuarioAuthenticationModel = await this.usuarioAuthentication.auth({
        email,
        password
      })

      return ok(usuarioAuthenticationModel)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
