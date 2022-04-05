import { LoadUsuarioParams } from '@/domain/usecases/usuario/add-usuario/incluir-usuario'

export interface LoadUsuarioByTokenRepository {
  loadByToken: (token: string, role?: string) => Promise<LoadUsuarioParams | null>
}
