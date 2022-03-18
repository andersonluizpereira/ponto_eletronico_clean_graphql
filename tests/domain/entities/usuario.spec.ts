import { Usuario } from '@/domain/entities'

describe('Usuario', () => {
  let usuario: Usuario

  beforeAll(() => {
    usuario = new Usuario('any_id', 'any_nome', '839.435.452-10', '286833931', new Date(), '11965928203', 'any_token_acesso', true, 'any_email')
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
  })

  it('should oUsuarioFazAniversarioHoje', () => {
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
})
