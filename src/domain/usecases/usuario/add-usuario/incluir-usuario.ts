import { Usuario } from '@/domain/entities'

export type AddUsuarioParams = Omit<Usuario, 'id'>
export type LoadUsuarioParams = Usuario

export interface IncluirUsuario {
  add: (usuario: AddUsuarioParams) => Promise<AddUsuarioParams | null>
}
