import { Usuario } from '@/domain/entities'

describe('Usuario', () => {
  it('should created usuario', () => {
    const usuario = new Usuario()
    expect(usuario).toBeTruthy()
  })

  it('should created usuario with id', () => {
    const usuario = new Usuario('id')
    expect(usuario.id).toBe('id')
  })

  it('should created usuario with nome', () => {
    const usuario = new Usuario('', 'nome')
    expect(usuario.nome).toBe('nome')
  })

  it('should created usuario with cpf', () => {
    const usuario = new Usuario('', '', 'cpf')
    expect(usuario.cpf).toBe('cpf')
  })

  it('should created usuario with rg', () => {
    const usuario = new Usuario('', '', '', 'rg')
    expect(usuario.rg).toBe('rg')
  })

  it('should created usuario with dataNascimento', () => {
    const usuario = new Usuario('', '', '', '', new Date())
    expect(usuario.dataNascimento).toBeInstanceOf(Date)
  })

  it('should created usuario with telefone', () => {
    const usuario = new Usuario('', '', '', '', new Date(), 'telefone')
    expect(usuario.telefone).toBe('telefone')
  })

  it('should created usuario with tokenAcesso', () => {
    const usuario = new Usuario('', '', '', '', new Date(), '', 'tokenAcesso')
    expect(usuario.tokenAcesso).toBe('tokenAcesso')
  })

  it('should created usuario with estaAtivo', () => {
    const usuario = new Usuario('', '', '', '', new Date(), '', '', true)
    expect(usuario.estaAtivo).toBeTruthy()
  })

  it('should created usuario with email', () => {
    const usuario = new Usuario('', '', '', '', new Date(), '', '', true, 'email')
    expect(usuario.email).toBe('email')
  })

  it('should created usuario with all properties', () => {
    const usuario = new Usuario('id', 'nome', 'cpf', 'rg', new Date(), 'telefone', 'tokenAcesso', true, 'email')
    expect(usuario.id).toBe('id')
    expect(usuario.nome).toBe('nome')
    expect(usuario.cpf).toBe('cpf')
    expect(usuario.rg).toBe('rg')
    expect(usuario.dataNascimento).toBeInstanceOf(Date)
    expect(usuario.telefone).toBe('telefone')
    expect(usuario.tokenAcesso).toBe('tokenAcesso')
    expect(usuario.estaAtivo).toBeTruthy()
    expect(usuario.email).toBe('email')
  })

  it('should oUsuarioFazAniversarioHoje', () => {
    const usuario = new Usuario('', '', '', '', new Date(), '', '', true, 'email')
    expect(usuario.oUsuarioFazAniversarioHoje()).toBeTruthy()
  })

  it('should oUsuarioPossuiUmRGValido', () => {
    const usuario = new Usuario('', '', '', '428214538', new Date(), '', '', true, 'email')
    expect(usuario.oUsuarioPossuiUmRGValido()).toBeTruthy()
  })

  it('should oUsuarioPossuiUmCPFValido', () => {
    const usuario = new Usuario('', '', '32282166833', '', new Date(), '', '', true, 'email')
    expect(usuario.oUsuarioPossuiUmCPFValido()).toBeTruthy()
  })

  it('should oUsuarioPossuiUmTelefoneValido', () => {
    const usuario = new Usuario('', '', '', '', new Date(), '11965928203', '', true, 'email')
    expect(usuario.oUsuarioPossuiUmTelefoneValido()).toBeTruthy()
  })

  it('should enviarMensagemDeParabens', () => {
    const usuario = new Usuario('', '', '', '', new Date(), '', '', true, 'email')
    expect(usuario.enviarMensagemDeParabens()).toBeTruthy()
  })
})
