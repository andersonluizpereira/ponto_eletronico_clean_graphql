import { LoadUsuarioByTokenInput, LoadUsuarioOutput } from '@/domain/usecases'

export interface LoadUsuarioByTokenRepository {
  loadByToken: (loadUsuarioByTokenInput: LoadUsuarioByTokenInput) => Promise<LoadUsuarioOutput | null>
}
