import { UsuarioMongoRepository } from '@/infra/db/mongodb'
import { MongoHelper } from '@/infra/db/mongodb/helpers'

import { Collection } from 'mongodb'
import faker from 'faker'
import { mockAddUsuarioParams, mockUsuarioModel } from '@/tests/data/mocks/models'
import { LoadUsuarioByEmailInput } from '@/domain/usecases'

let usuarioCollection: Collection

describe('UsuarioMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as any)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    usuarioCollection = await MongoHelper.getCollection('usuarios')
    await usuarioCollection.deleteMany({})
  })

  const makeSut = (): UsuarioMongoRepository => {
    return new UsuarioMongoRepository()
  }

  describe('add()', () => {
    test('Should return an usuario on success', async () => {
      const sut = makeSut()
      const addUsuarioParams = mockUsuarioModel() as any
      const usuario = await sut.add(addUsuarioParams)
      expect(usuario).toBeTruthy()
      expect(usuario?.id).toBeTruthy()
      expect(usuario?.nome).toBe(addUsuarioParams.nome)
      expect(usuario?.email).toBe(addUsuarioParams.email)
      expect(usuario?.password).toBe(addUsuarioParams.password)
    })
  })

  describe('loadByEmail()', () => {
    test('Should return an usuario on success', async () => {
      const sut = makeSut()
      const addUsuarioParams = mockAddUsuarioParams() as any
      await usuarioCollection.insertOne(addUsuarioParams)
      const usuario = await sut.loadByEmail({ email: addUsuarioParams.email })
      expect(usuario).toBeTruthy()
      expect(usuario?.id).toBeTruthy()
      expect(usuario?.nome).toBe(addUsuarioParams.nome)
      expect(usuario?.email).toBe(addUsuarioParams.email)
      expect(usuario?.password).toBe(addUsuarioParams.password)
    })

    test('Should return null if loadByEmail fails', async () => {
      const sut = makeSut()
      const loadUsuarioByEmailInput: LoadUsuarioByEmailInput = { email: faker.internet.email() as any }
      const usuario = await sut.loadByEmail(loadUsuarioByEmailInput)
      expect(usuario).toBeFalsy()
    })
  })

  describe('updateAccessToken()', () => {
    test('Should update the usuario tokenAcesso on success', async () => {
      const sut = makeSut()
      const res = await usuarioCollection.insertOne({
        nome: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      })
      const fakeAccount = res.ops[0]
      expect(fakeAccount.tokenAcesso).toBeFalsy()
      const tokenAcesso = faker.datatype.uuid()
      await sut.update({ id: fakeAccount._id, tokenAcesso })
      const usuario = await usuarioCollection.findOne({ _id: fakeAccount._id })
      expect(usuario).toBeTruthy()
      expect(usuario.tokenAcesso).toBe(tokenAcesso)
    })
  })

  describe('loadByToken()', () => {
    let nome = faker.name.findName()
    let email = faker.internet.email()
    let password = faker.internet.password()
    let tokenAcesso = faker.datatype.uuid()

    beforeEach(() => {
      nome = faker.name.findName()
      email = faker.internet.email()
      password = faker.internet.password()
      tokenAcesso = faker.datatype.uuid()
    })

    test('Should return an usuario on loadByToken without role', async () => {
      const sut = makeSut()
      await usuarioCollection.insertOne({
        nome,
        email,
        password,
        tokenAcesso
      })
      const usuario = await sut.loadByToken({ tokenAcesso })
      expect(usuario).toBeTruthy()
      expect(usuario?.id).toBeTruthy()
      expect(usuario?.nome).toBe(nome)
      expect(usuario?.email).toBe(email)
      expect(usuario?.password).toBe(password)
    })

    test('Should return an usuario on loadByToken with admin role', async () => {
      const sut = makeSut()
      await usuarioCollection.insertOne({
        nome,
        email,
        password,
        tokenAcesso,
        role: 'admin'
      })
      const usuario = await sut.loadByToken({ tokenAcesso, role: 'admin' })
      expect(usuario).toBeTruthy()
      expect(usuario?.id).toBeTruthy()
      expect(usuario?.nome).toBe(nome)
      expect(usuario?.email).toBe(email)
      expect(usuario?.password).toBe(password)
    })

    test('Should return null on loadByToken with invalid role', async () => {
      const sut = makeSut()
      await usuarioCollection.insertOne({
        nome,
        email,
        password,
        tokenAcesso
      })
      const usuario = await sut.loadByToken({ tokenAcesso, role: 'admin' })
      expect(usuario).toBeFalsy()
    })

    test('Should return an usuario on loadByToken with if user is admin', async () => {
      const sut = makeSut()
      await usuarioCollection.insertOne({
        nome,
        email,
        password,
        tokenAcesso,
        role: 'admin'
      })
      const usuario = await sut.loadByToken({ tokenAcesso })
      expect(usuario).toBeTruthy()
      expect(usuario?.id).toBeTruthy()
      expect(usuario?.nome).toBe(nome)
      expect(usuario?.email).toBe(email)
      expect(usuario?.password).toBe(password)
    })

    test('Should return null if loadByToken fails', async () => {
      const sut = makeSut()
      const usuario = await sut.loadByToken({ tokenAcesso })
      expect(usuario).toBeFalsy()
    })
  })
})
