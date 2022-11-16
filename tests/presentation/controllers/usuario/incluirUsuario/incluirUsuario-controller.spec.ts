import { IncluirUsuarioController } from '@/presentation/controllers'
import { throwError } from '@/tests/data/mocks/models'
import { EmailInUseError, MissingParamError, PasswordsDoNotMatch, ServerError } from '@/presentation/errors'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers'
import { HttpRequest } from '@/presentation/protocols'
import faker from 'faker'
import { AuthenticationSpy, IncluirUsuarioSpy, ValidationSpy } from '@/tests/data/mocks/spys'

const mockRequest = (): HttpRequest => {
  return {
    body: {
      nome: 'Anderson P',
      cpf: '322.821.668-33',
      rg: '11.111.111-1',
      dataNascimento: '1985-02-22',
      telefone: '+5511965928203',
      tokenAcesso: '1',
      email: 'andy2903.alp@gmail.com',
      password: '12345678',
      passwordConfirmation: '12345678'
    }
  }
}

type SutTypes = {
  sut: IncluirUsuarioController
  incluirUsuarioSpy: IncluirUsuarioSpy
  validationSpy: ValidationSpy
  authenticationSpy: AuthenticationSpy
}

const makeSut = (): SutTypes => {
  const authenticationSpy = new AuthenticationSpy()
  const incluirUsuarioSpy = new IncluirUsuarioSpy()
  const validationSpy = new ValidationSpy()
  const sut = new IncluirUsuarioController(incluirUsuarioSpy, validationSpy, authenticationSpy)
  return {
    sut,
    incluirUsuarioSpy,
    validationSpy,
    authenticationSpy
  }
}

describe('Incluir Usuario Controller', () => {
  test('Should return 500 if AddAccount throws', async () => {
    const { sut, incluirUsuarioSpy } = makeSut()
    jest.spyOn(incluirUsuarioSpy, 'add').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null as any)))
  })

  test('Should call Incluir Usuario with correct values', async () => {
    const httpRequest = mockRequest()
    const { sut, incluirUsuarioSpy } = makeSut()
    await sut.handle(httpRequest.body)
    expect(ok(incluirUsuarioSpy.addUsuarioParams)).toMatchObject(ok({
      tokenAcesso: httpRequest.body.tokenAcesso,
      nome: httpRequest.body.nome
    }))
  })

  test('Should return 403 if Incluir Usuario returns null', async () => {
    const { sut, incluirUsuarioSpy } = makeSut()
    jest.spyOn(incluirUsuarioSpy, 'add').mockImplementationOnce(() => null as any)
    incluirUsuarioSpy.usuarioModel = null as any
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
  })

  test('Should return 400 if invalid password returns null', async () => {
    const { sut } = makeSut()
    const httpRequest = mockRequest()
    httpRequest.body.passwordConfirmation = 'invalid_password'
    const httpResponse = await sut.handle(httpRequest.body)
    const error = new PasswordsDoNotMatch()
    expect(httpResponse.body).toEqual(error)
  })

  test('Should call Validation with correct value', async () => {
    const { sut, validationSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest.body)
    expect(validationSpy.input).toEqual(httpRequest.body)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new MissingParamError(faker.random.word())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })
})
