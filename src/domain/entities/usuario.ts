import Cpf from '@/domain/entities/cpf'

export class Usuario {
  id?: string
  nome?: string
  cpf?: Cpf
  rg?: string
  dataNascimento?: Date
  telefone?: string
  tokenAcesso?: string
  estaAtivo?: boolean
  email?: string
  password?: string

  constructor (id?: string, nome?: string, cpf?: string,
    rg?: string, dataNascimento?: Date, telefone?: string,
    tokenAcesso?: string, estaAtivo?: boolean, email?: string,
    password?: string) {
    this.id = id
    this.nome = nome
    this.cpf = new Cpf(String(cpf))
    this.rg = rg
    this.dataNascimento = dataNascimento
    this.telefone = telefone
    this.tokenAcesso = tokenAcesso
    this.estaAtivo = estaAtivo
    this.email = email
    this.password = password
  }

  oUsuarioFazAniversarioHoje (): boolean {
    const hoje = new Date()
    const aniversario = this.dataNascimento
    return hoje.getDate() === aniversario?.getDate() && hoje.getMonth() === aniversario?.getMonth()
  }

  oUsuarioPossuiUmRGValido (): boolean {
    const documento = this.rg as any
    return (documento.length > 0 && documento.length === 9)
  }

  enviarMensagemDeParabens (): String | undefined {
    if (this.oUsuarioFazAniversarioHoje()) {
      return `Parabéns ${this.nome}! Você já faz um aniversário hoje!`
    }
  }

  oUsuarioPossuiUmTelefoneValido (): boolean {
    const telefoneAValidar = this.telefone as any
    return (telefoneAValidar.length > 0 && telefoneAValidar.length === 11)
  }

  obterCampos (): any {
    return {
      nome: this.nome,
      cpf: this.cpf?.value,
      rg: this.rg,
      dataNascimento: this.dataNascimento,
      telefone: this.telefone,
      tokenAcesso: this.tokenAcesso,
      estaAtivo: this.estaAtivo,
      email: this.email,
      password: this.password
    }
  }
}
