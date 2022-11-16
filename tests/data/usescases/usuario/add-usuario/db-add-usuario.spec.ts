import { DbAddUsuario } from '@/data/usescases/usuario/add-usuario/db-add-usuario'
import { HasherSpy, AddUsuarioRepositorySpy, LoadUsuarioByEmailRepositorySpy } from '@/tests/data/mocks/spys'
import { mockAddUsuarioParams, throwError, mockUsuarioModel } from '@/tests/data/mocks/models'

type SutTypes = {
  sut: DbAddUsuario
  hasherSpy: HasherSpy
  addUsuarioRepositorySpy: AddUsuarioRepositorySpy
  loadUsuarioByEmailRepositorySpy: LoadUsuarioByEmailRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadUsuarioByEmailRepositorySpy = new LoadUsuarioByEmailRepositorySpy()
  loadUsuarioByEmailRepositorySpy.usuarioModel = null as any
  const hasherSpy = new HasherSpy()
  const addUsuarioRepositorySpy = new AddUsuarioRepositorySpy()
  const sut = new DbAddUsuario(hasherSpy, addUsuarioRepositorySpy, loadUsuarioByEmailRepositorySpy)
  return {
    sut,
    hasherSpy,
    addUsuarioRepositorySpy,
    loadUsuarioByEmailRepositorySpy
  }
}

describe('DbAddUsuario Usecase', () => {
  it('Should call Hasher with correct plaintext', async () => {
    const { sut, hasherSpy } = makeSut()
    const addUsuarioParams = mockAddUsuarioParams()
    await sut.add(addUsuarioParams)
    expect(hasherSpy.plaintext).toBe(addUsuarioParams.password)
  })

  it('Should throw if Hasher throws', async () => {
    const { sut, hasherSpy } = makeSut()
    jest.spyOn(hasherSpy, 'hash').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddUsuarioParams())
    await expect(promise).rejects.toThrow()
  })

  it('Should call AddUsuarioRepository with correct values', async () => {
    const { sut, addUsuarioRepositorySpy, hasherSpy } = makeSut()
    const addUsuarioParams = mockAddUsuarioParams()
    await sut.add(addUsuarioParams)
    expect(addUsuarioRepositorySpy.addUsuarioParams).toMatchObject({
      nome: addUsuarioParams.nome,
      email: addUsuarioParams.email,
      password: hasherSpy.digest
    })
  })

  it('Should throw if AddUsuarioRepository throws', async () => {
    const { sut, addUsuarioRepositorySpy } = makeSut()
    jest.spyOn(addUsuarioRepositorySpy, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddUsuarioParams())
    await expect(promise).rejects.toThrow()
  })

  it('Should return an usuario on success', async () => {
    const { sut, addUsuarioRepositorySpy } = makeSut()
    const usuario = await sut.add(mockAddUsuarioParams())
    expect(usuario).toEqual(addUsuarioRepositorySpy.usuarioModel)
  })

  it('Should return null if LoadUsuarioByEmailRepository not return null', async () => {
    const { sut, loadUsuarioByEmailRepositorySpy } = makeSut()
    loadUsuarioByEmailRepositorySpy.usuarioModel = mockUsuarioModel()
    const usuario = await sut.add(mockAddUsuarioParams())
    expect(usuario).toBeNull()
  })

  it('Should call LoadUsuarioByEmailRepository with correct email', async () => {
    const { sut, loadUsuarioByEmailRepositorySpy } = makeSut()
    const addUsuarioParams = mockAddUsuarioParams()
    await sut.add(addUsuarioParams)
    expect(loadUsuarioByEmailRepositorySpy.email).toBe(addUsuarioParams.email)
  })
})
