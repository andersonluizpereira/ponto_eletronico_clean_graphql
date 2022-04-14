import { Usuario } from '@/domain/entities'

describe('Usuario', () => {
  let usuario: Usuario
  let dateFake: Date

  beforeAll(() => {
    dateFake = new Date(1985, 1, 22, 19, 19, 19, 19)
    usuario = new Usuario('any_id', 'any_nome', '839.435.452-10', '286833931', dateFake, '11965928203', 'any_token_acesso', true, 'any_email', 'any_password')
  })

  it('should created usuario', () => {
    expect(usuario).toBeTruthy()
  })

  it('should created usuario with id', () => {
    expect(usuario.id).toBe('any_id')
  })

  it('should created usuario with nome', () => {
    expect(usuario.nome).toBe('any_nome')
  })

  it('should created usuario with cpf', () => {
    expect(usuario.cpf?.value).toBe('839.435.452-10')
  })

  it('should created usuario with rg', () => {
    expect(usuario.rg).toBe('286833931')
  })

  it('should created usuario with dataNascimento', () => {
    expect(usuario.dataNascimento).toBeInstanceOf(Date)
  })

  it('should created usuario with telefone', () => {
    expect(usuario.telefone).toBe('11965928203')
  })

  it('should created usuario with tokenAcesso', () => {
    expect(usuario.tokenAcesso).toBe('any_token_acesso')
  })

  it('should created usuario with estaAtivo', () => {
    expect(usuario.estaAtivo).toBeTruthy()
  })

  it('should created usuario with email', () => {
    expect(usuario.email).toBe('any_email')
  })

  it('should created usuario with password', () => {
    expect(usuario.password).toBe('any_password')
  })

  it('should created usuario with all properties', () => {
    expect(usuario.id).toBe('any_id')
    expect(usuario.nome).toBe('any_nome')
    expect(usuario.cpf?.value).toBe('839.435.452-10')
    expect(usuario.rg).toBe('286833931')
    expect(usuario.dataNascimento).toBeInstanceOf(Date)
    expect(usuario.telefone).toBe('11965928203')
    expect(usuario.tokenAcesso).toBe('any_token_acesso')
    expect(usuario.estaAtivo).toBeTruthy()
    expect(usuario.email).toBe('any_email')
    expect(usuario.password).toBe('any_password')
  })

  it('should oUsuarioFazAniversarioHoje toBeTruthy', () => {
    jest
      .useFakeTimers()
      .setSystemTime(dateFake.getTime())
    expect(usuario.oUsuarioFazAniversarioHoje()).toBeTruthy()
  })

  it('should oUsuarioPossuiUmRGValido', () => {
    expect(usuario.oUsuarioPossuiUmRGValido()).toBeTruthy()
  })

  it('should oUsuarioPossuiUmTelefoneValido', () => {
    expect(usuario.oUsuarioPossuiUmTelefoneValido()).toBeTruthy()
  })

  it('should enviarMensagemDeParabens', () => {
    expect(usuario.enviarMensagemDeParabens()).toBeTruthy()
  })

  it('should obterCampos', () => {
    expect(usuario.obterCampos()).toEqual({ nome: 'any_nome', cpf: '839.435.452-10', rg: '286833931', dataNascimento: new Date('1985-02-22T22:19:19.019Z'), telefone: '11965928203', tokenAcesso: 'any_token_acesso', estaAtivo: true, email: 'any_email', password: 'any_password' })
  })
})
