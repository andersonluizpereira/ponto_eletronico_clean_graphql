import { UsuarioAuthentication } from '@/domain/usecases'
import { badRequest, unauthorized, serverError, ok } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'

export class LoginController implements Controller {
  constructor (
    private readonly usuarioAuthentication: UsuarioAuthentication,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest)
      if (error) {
        return badRequest(error)
      }
      const { email, password } = httpRequest as any
      const authenticationModel = await this.usuarioAuthentication.auth({
        email,
        password
      })
      if (!authenticationModel) {
        return unauthorized()
      }
      return ok(authenticationModel)
    } catch (error) {
      return serverError(error as any)
    }
  }
}
