import { Usuario } from '@/domain/entities'

export type AddUsuarioInput = Omit<Usuario, 'id'>
export type LoadUsuarioOutput = Usuario

export interface IncluirUsuario {
  add: (usuario: AddUsuarioInput) => Promise<AddUsuarioInput>
}
