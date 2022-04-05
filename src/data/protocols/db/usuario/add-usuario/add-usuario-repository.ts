import { AddUsuarioParams } from '@/domain/usecases/usuario/add-usuario/incluir-usuario'

export interface AddUsuarioRepository {
  add: (data: AddUsuarioParams) => Promise<AddUsuarioParams | null>
}
