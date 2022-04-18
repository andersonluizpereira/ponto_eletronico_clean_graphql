import { DbUsuarioAuthentication } from '@/data/usescases'
import { EncrypterSpy, HashComparerSpy, UpdateUsuarioAccessTokenRepositorySpy, LoadUsuarioByEmailRepositorySpy } from '@/tests/data/mocks/spys'
import { mockAuthenticationIntput, throwError } from '@/tests/data/mocks/models'
import { UsuarioAuthenticationOutput } from '@/domain/usecases'

type SutTypes = {
  sut: DbUsuarioAuthentication
  loadUsuarioByEmailRepositorySpy: LoadUsuarioByEmailRepositorySpy
  hashComparerSpy: HashComparerSpy
  encrypterSpy: EncrypterSpy
  updateUsuarioAccessTokenRepositorySpy: UpdateUsuarioAccessTokenRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadUsuarioByEmailRepositorySpy = new LoadUsuarioByEmailRepositorySpy()
  const hashComparerSpy = new HashComparerSpy()
  const encrypterSpy = new EncrypterSpy()
  const updateUsuarioAccessTokenRepositorySpy = new UpdateUsuarioAccessTokenRepositorySpy()
  const sut = new DbUsuarioAuthentication(
    loadUsuarioByEmailRepositorySpy,
    hashComparerSpy,
    encrypterSpy,
    updateUsuarioAccessTokenRepositorySpy
  )
  return {
    sut,
    loadUsuarioByEmailRepositorySpy,
    hashComparerSpy,
    encrypterSpy,
    updateUsuarioAccessTokenRepositorySpy
  }
}

describe('DbUsuarioAuthentication UseCase', () => {
  test('Should call LoadUsuarioByEmailRepository with correct email', async () => {
    const { sut, loadUsuarioByEmailRepositorySpy } = makeSut()
    const authenticationParams = mockAuthenticationIntput()
    await sut.auth(authenticationParams)
    expect(loadUsuarioByEmailRepositorySpy.email).toBe(authenticationParams.email)
  })

  test('Should throw if LoadUsuarioByEmailRepository throws', async () => {
    const { sut, loadUsuarioByEmailRepositorySpy } = makeSut()
    jest.spyOn(loadUsuarioByEmailRepositorySpy, 'loadByEmail').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthenticationIntput())
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if LoadUsuarioByEmailRepository returns null', async () => {
    const { sut, loadUsuarioByEmailRepositorySpy } = makeSut()
    loadUsuarioByEmailRepositorySpy.usuarioModel = null
    const model = await sut.auth(mockAuthenticationIntput())
    expect(model).toBeNull()
  })

  test('Should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadUsuarioByEmailRepositorySpy } = makeSut()
    loadUsuarioByEmailRepositorySpy.usuarioModel = null
    const model = await sut.auth(mockAuthenticationIntput())
    expect(model).toBeNull()
  })

  test('Should call HashComparer with correct values', async () => {
    const { sut, hashComparerSpy, loadUsuarioByEmailRepositorySpy } = makeSut()
    const authenticationParams = mockAuthenticationIntput()
    await sut.auth(authenticationParams)
    expect(hashComparerSpy.plaintext).toBe(authenticationParams.password)
    expect(hashComparerSpy.digest).toBe(loadUsuarioByEmailRepositorySpy.usuarioModel?.password)
  })

  test('Should throw if HashComparer throws', async () => {
    const { sut, hashComparerSpy } = makeSut()
    jest.spyOn(hashComparerSpy, 'compare').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthenticationIntput())
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if HashComparer returns false', async () => {
    const { sut, hashComparerSpy } = makeSut()
    hashComparerSpy.isValid = false
    const model = await sut.auth(mockAuthenticationIntput())
    expect(model).toBeNull()
  })

  test('Should call Encrypter with correct plaintext', async () => {
    const { sut, encrypterSpy, loadUsuarioByEmailRepositorySpy } = makeSut()
    await sut.auth(mockAuthenticationIntput())
    expect(encrypterSpy.plaintext).toBe(loadUsuarioByEmailRepositorySpy.usuarioModel?.id)
  })

  test('Should throw if Encrypter throws', async () => {
    const { sut, encrypterSpy } = makeSut()
    jest.spyOn(encrypterSpy, 'encrypt').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthenticationIntput())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an AuthenticationModel on success', async () => {
    const { sut, encrypterSpy, loadUsuarioByEmailRepositorySpy } = makeSut()
    const usuarioAuthenticationOutput = await sut.auth(mockAuthenticationIntput()) as UsuarioAuthenticationOutput
    expect(usuarioAuthenticationOutput.tokenAcesso).toBe(encrypterSpy.ciphertext)
    expect(usuarioAuthenticationOutput.nome).toBe(loadUsuarioByEmailRepositorySpy.usuarioModel?.nome)
  })

  test('Should call UpdateAccessTokenRepository with correct values', async () => {
    const { sut, updateUsuarioAccessTokenRepositorySpy, loadUsuarioByEmailRepositorySpy, encrypterSpy } = makeSut()
    await sut.auth(mockAuthenticationIntput())
    expect(updateUsuarioAccessTokenRepositorySpy.id).toBe(loadUsuarioByEmailRepositorySpy.usuarioModel?.id)
    expect(updateUsuarioAccessTokenRepositorySpy.tokenAcesso).toBe(encrypterSpy.ciphertext)
  })

  test('Should throw if UpdateAccessTokenRepository throws', async () => {
    const { sut, updateUsuarioAccessTokenRepositorySpy } = makeSut()
    jest.spyOn(updateUsuarioAccessTokenRepositorySpy, 'update').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthenticationIntput())
    await expect(promise).rejects.toThrow()
  })
})
