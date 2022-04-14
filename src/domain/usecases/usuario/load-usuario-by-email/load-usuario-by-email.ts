import { Usuario } from '@/domain/entities'

export type LoadUsuarioByEmailOutput = Usuario

export type LoadUsuarioByEmailInput = {
  email: string
}

export interface LoadUsuarioByEmail {
  load: (loadUsuarioByEmailInput: LoadUsuarioByEmailInput) => Promise<LoadUsuarioByEmailOutput>
}
