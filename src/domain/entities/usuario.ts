export class Usuario {
  id?: string
  nome?: string
  cpf?: string
  rg?: string
  dataNascimento?: Date
  telefone?: string
  tokenAcesso?: string
  estaAtivo?: boolean
  email?: string

  constructor (id?: string, nome?: string, cpf?: string,
    rg?: string, dataNascimento?: Date, telefone?: string,
    tokenAcesso?: string, estaAtivo?: boolean, email?: string) {
    this.id = id
    this.nome = nome
    this.cpf = cpf
    this.rg = rg
    this.dataNascimento = dataNascimento
    this.telefone = telefone
    this.tokenAcesso = tokenAcesso
    this.estaAtivo = estaAtivo
    this.email = email
  }

  oUsuarioFazAniversarioHoje (): boolean {
    const hoje = new Date()
    const aniversario = this.dataNascimento
    return hoje.getDate() === aniversario!.getDate() &&
      hoje.getMonth() === aniversario!.getMonth()
  }

  oUsuarioPossuiUmRGValido (): boolean {
    return ((this.rg!).length > 0) && this.rg!.length === 9
  }

  oUsuarioPossuiUmCPFValido (): boolean {
    return ((this.cpf!).length > 0) && this.cpf!.length === 11
  }

  enviarMensagemDeParabens (): any {
    if (this.oUsuarioFazAniversarioHoje()) {
      return `Parabéns ${this.nome}! Você já faz um aniversário hoje!`
    }
  }

  oUsuarioPossuiUmTelefoneValido (): boolean {
    return ((this.telefone!).length > 0) && this.telefone!.length === 11
  }
}
