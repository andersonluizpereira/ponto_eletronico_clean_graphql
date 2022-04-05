import { LoadUsuarioParams } from '@/domain/usecases/usuario/add-usuario/incluir-usuario'

export interface LoadUsuarioByEmailRepository {
  loadByEmail: (email: string) => Promise<LoadUsuarioParams | null>
}
