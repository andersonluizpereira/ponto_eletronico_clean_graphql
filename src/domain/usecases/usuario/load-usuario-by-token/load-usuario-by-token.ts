import { Usuario } from '@/domain/entities'

export type LoadUsuarioByTokenOutput = Usuario

export type LoadUsuarioByTokenInput = {
  tokenAcesso: string
  role?: string
}

export interface LoadUsuarioByToken {
  loadByToken: (loadUsuarioByTokenInput: LoadUsuarioByTokenInput) => Promise<LoadUsuarioByTokenOutput>
}
