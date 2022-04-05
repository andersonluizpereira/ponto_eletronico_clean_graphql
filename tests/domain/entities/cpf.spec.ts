import Cpf from '@/domain/entities/cpf'

describe('CPF', () => {
  it('Should validate cpf', function () {
    const cpf = new Cpf('935.411.347-80')
    expect(cpf).toBeTruthy()
  })

  it('Should validate cpf is invalid', function () {
    expect(() => new Cpf('')).toThrow(new Error('CPF inválido'))
  })

  it('Should tentar validate cpf invalid', function () {
    expect(() => new Cpf('123.456.789-99')).toThrow(new Error('CPF inválido'))
  })

  it('Should tentar validate cpf with digit`s equalities', function () {
    expect(() => new Cpf('111.111.111-11')).toThrow(new Error('CPF inválido'))
  })

  it('Should tentar validate cpf invalid very long', function () {
    expect(() => new Cpf('123.456.789-1000')).toThrow(new Error('CPF inválido'))
  })

  it('Should tentar validate cpf invalid very small', function () {
    expect(() => new Cpf('123.456')).toThrow(new Error('CPF inválido'))
  })
})
