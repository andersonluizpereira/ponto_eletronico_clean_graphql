import { IncluirUsuario, UsuarioAuthentication } from '@/domain/usecases'
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
      const error = this.validation.validate(httpRequest)

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
      } = httpRequest as any

      if (password !== passwordConfirmation) {
        return badRequest(new PasswordsDoNotMatch())
      }

      const account = await this.incluirUsuario.add({
        nome,
        cpf,
        rg,
        dataNascimento,
        telefone,
        tokenAcesso,
        estaAtivo,
        email,
        password
      } as any)

      if (!account) {
        return forbidden(new EmailInUseError())
      }

      return ok({
        tokenAcesso: account.tokenAcesso,
        nome: account.nome,
        email: account.email
      })
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
