import faker from 'faker'
import { DbLoadUsuarioByToken } from '@/data/usescases'
import { DecrypterSpy, LoadUsuarioByTokenRepositorySpy } from '@/tests/data/mocks/spys/'
import { throwError } from '@/tests/data/mocks/models'
import { LoadUsuarioByTokenInput } from '@/domain/usecases'

type SutTypes = {
  sut: DbLoadUsuarioByToken
  decrypterSpy: DecrypterSpy
  loadUsuarioByTokenRepositorySpy: LoadUsuarioByTokenRepositorySpy
}

const makeSut = (): SutTypes => {
  const decrypterSpy = new DecrypterSpy()
  const loadUsuarioByTokenRepositorySpy = new LoadUsuarioByTokenRepositorySpy()
  const sut = new DbLoadUsuarioByToken(decrypterSpy, loadUsuarioByTokenRepositorySpy)
  return {
    sut,
    decrypterSpy,
    loadUsuarioByTokenRepositorySpy
  }
}

let token: String
let role: String
let loadUsuarioByTokenInput: LoadUsuarioByTokenInput

describe('DbLoadUsuarioByToken Usecase', () => {
  beforeEach(() => {
    loadUsuarioByTokenInput = {
      accessToken: faker.random.uuid(),
      role: faker.random.word()
    }
    token = loadUsuarioByTokenInput.accessToken
    role = String(loadUsuarioByTokenInput.role)
  })

  test('Should call Decrypter with correct ciphertext', async () => {
    const { sut, decrypterSpy } = makeSut()
    await sut.load(loadUsuarioByTokenInput)
    expect(decrypterSpy.ciphertext).toBe(token)
  })

  test('Should return null if Decrypter returns null', async () => {
    const { sut, decrypterSpy } = makeSut()
    decrypterSpy.plaintext = ''
    const usuario = await sut.load(loadUsuarioByTokenInput)
    expect(usuario).toBeNull()
  })

  test('Should call LoadUsuarioByTokenRepository with correct values', async () => {
    const { sut, loadUsuarioByTokenRepositorySpy } = makeSut()
    await sut.load(loadUsuarioByTokenInput)

    expect(loadUsuarioByTokenRepositorySpy.accessToken).toBe(token)
    expect(loadUsuarioByTokenRepositorySpy.role).toBe(role)
  })

  test('Should return null if LoadUsuarioByTokenRepository returns null', async () => {
    const { sut, loadUsuarioByTokenRepositorySpy } = makeSut()
    loadUsuarioByTokenRepositorySpy.usuarioModel = null
    const usuario = await sut.load(loadUsuarioByTokenInput)
    expect(usuario).toBeNull()
  })

  test('Should return an usuario on success', async () => {
    const { sut, loadUsuarioByTokenRepositorySpy } = makeSut()
    const usuario = await sut.load(loadUsuarioByTokenInput)
    expect(usuario).toEqual(loadUsuarioByTokenRepositorySpy.usuarioModel)
  })

  test('Should throw if Decrypter throws', async () => {
    const { sut, decrypterSpy } = makeSut()
    jest.spyOn(decrypterSpy, 'decrypt').mockImplementationOnce(throwError)
    const usuario = await sut.load(loadUsuarioByTokenInput)
    await expect(usuario).toBeNull()
  })

  test('Should throw if LoadUsuarioByTokenRepository throws', async () => {
    const { sut, loadUsuarioByTokenRepositorySpy } = makeSut()
    jest.spyOn(loadUsuarioByTokenRepositorySpy, 'load').mockImplementationOnce(throwError)
    const promise = sut.load(loadUsuarioByTokenInput)
    await expect(promise).rejects.toThrow()
  })
})
