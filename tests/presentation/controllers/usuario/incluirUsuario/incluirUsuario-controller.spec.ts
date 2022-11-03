import { IncluirUsuarioController } from '@/presentation/controllers'
import { throwError } from '@/tests/data/mocks/models'
import { EmailInUseError, MissingParamError, ServerError } from '@/presentation/errors'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers'
import { HttpRequest } from '@/presentation/protocols'
import faker from 'faker'
import { AuthenticationSpy, IncluirUsuarioSpy, ValidationSpy } from '@/tests/data/mocks/spys'
import { Usuario } from '@/domain/entities'

const password = faker.internet.password()
const obterCamposUsuario = new Usuario(
  faker.datatype.uuid(),
  faker.name.findName(),
  '839.435.452-10',
  '286833931',
  new Date(faker.date.past()),
  faker.phone.phoneNumber(),
  'any_token_acesso',
  faker.datatype.boolean(),
  faker.internet.email(),
  password).obterCampos()

const mockRequest = (): HttpRequest => {
  return {
    body: {
      nome: 'Tami Bartell',
      cpf: '839.435.452-10',
      rg: '286833931',
      dataNascimento: '1985-02-22T19:15:10.856Z',
      telefone: '5511965928203',
      estaAtivo: false,
      email: 'andy2903.alp@gmail.com',
      password: password,
      passwordConfirmation: password
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
  test.only('Should return 500 if AddAccount throws', async () => {
    const { sut, incluirUsuarioSpy } = makeSut()
    jest.spyOn(incluirUsuarioSpy, 'add').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null as any)))
  })

  test('Should call Incluir Usuario with correct values', async () => {
    const { sut, incluirUsuarioSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(incluirUsuarioSpy.addUsuarioParams).toEqual({
      nome: httpRequest.body.nome,
      email: httpRequest.body.email,
      password: httpRequest.body.password
    })
  })

  test('Should return 403 if Incluir Usuario returns null', async () => {
    const { sut, incluirUsuarioSpy } = makeSut()
    incluirUsuarioSpy.usuarioModel = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut, authenticationSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(authenticationSpy.authenticationModel))
  })

  test('Should call Validation with correct value', async () => {
    const { sut, validationSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(validationSpy.input).toEqual(httpRequest.body)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new MissingParamError(faker.random.word())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(authenticationSpy.authenticationInput).toEqual({
      email: httpRequest.body.email,
      password: httpRequest.body.password
    })
  })

  test('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationSpy } = makeSut()
    jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
