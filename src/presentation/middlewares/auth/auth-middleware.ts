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
        const account = await this.loadAccountByToken.load(loadUsuarioByTokenInput)
        if (account) {
          return ok({ accountId: account.id })
        }
      }
      return forbidden(new AccessDeniedError())
    } catch (error) {
      return serverError(error as any)
    }
  }
}
