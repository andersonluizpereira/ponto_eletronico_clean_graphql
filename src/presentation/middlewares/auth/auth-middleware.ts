import { HttpRequest, HttpResponse, Middleware } from '@/presentation/protocols'
import { forbidden, ok, serverError } from '@/presentation/helpers'
import { AccessDeniedError } from '@/presentation/errors'
import { LoadUsuarioByToken, LoadUsuarioByTokenInput } from '@/domain/usecases'
export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadUsuarioByToken,
    private readonly role?: string
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const tokenAcesso = httpRequest.headers?.['x-access-token']
      if (tokenAcesso) {
        const role = this.role
        const loadUsuarioByTokenInput: LoadUsuarioByTokenInput = { tokenAcesso, role }
        const usuario = await this.loadAccountByToken.loadByToken(loadUsuarioByTokenInput)
        if (usuario) {
          return ok({ accountId: usuario.id })
        }
      }
      return forbidden(new AccessDeniedError())
    } catch (error) {
      return serverError(error as any)
    }
  }
}
