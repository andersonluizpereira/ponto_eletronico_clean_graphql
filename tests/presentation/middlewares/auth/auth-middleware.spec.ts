import { throwError } from '@/tests/data/mocks/models'
import { AccessDeniedError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helpers'
import { HttpRequest } from '@/presentation/protocols'
import { LoadUsuarioByTokenSpy } from '@/tests/data/mocks/spys'
import { AuthMiddleware } from '@/presentation/middlewares'

const mockRequest = (): HttpRequest => ({
  headers: {
    'x-access-token': 'any_token'
  }
})

type SutTypes = {
  sut: AuthMiddleware
  loadUsuarioByTokenSpy: LoadUsuarioByTokenSpy
}

const makeSut = (role?: string): SutTypes => {
  const loadUsuarioByTokenSpy = new LoadUsuarioByTokenSpy()
  const sut = new AuthMiddleware(loadUsuarioByTokenSpy, role)
  return {
    sut,
    loadUsuarioByTokenSpy
  }
}

describe('Auth Middleware', () => {
  test('Should return 403 if no x-access-token exists in headers', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should call LoadAccountByToken with correct tokenAcesso', async () => {
    const role = 'any_role'
    const { sut, loadUsuarioByTokenSpy } = makeSut(role)
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(loadUsuarioByTokenSpy.tokenAcesso).toBe(httpRequest.headers['x-access-token'])
    expect(loadUsuarioByTokenSpy.role).toBe(role)
  })

  test('Should return 403 if LoadAccountByToken returns null', async () => {
    const { sut, loadUsuarioByTokenSpy } = makeSut()
    loadUsuarioByTokenSpy.usuarioModel = null as any
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should return 200 if LoadAccountByToken returns an usuario', async () => {
    const { sut, loadUsuarioByTokenSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok({
      usuarioId: loadUsuarioByTokenSpy.usuarioModel?.id
    }))
  })

  test('Should return 500 if LoadAccountByToken throws', async () => {
    const { sut, loadUsuarioByTokenSpy } = makeSut()
    jest.spyOn(loadUsuarioByTokenSpy, 'loadByToken').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
