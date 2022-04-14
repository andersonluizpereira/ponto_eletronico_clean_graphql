import { LoadUsuarioByTokenInput, LoadUsuarioOutput } from '@/domain/usecases'

export interface LoadUsuarioByTokenRepository {
  load: (loadUsuarioByTokenInput: LoadUsuarioByTokenInput) => Promise<LoadUsuarioOutput | null>
}
