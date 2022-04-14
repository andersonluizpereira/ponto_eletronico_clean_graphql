import { LoadUsuarioByEmailInput, LoadUsuarioByEmailOutput } from '@/domain/usecases'

export interface LoadUsuarioByEmailRepository {
  load: (loadUsuarioByEmailInput: LoadUsuarioByEmailInput) => Promise<LoadUsuarioByEmailOutput | null>
}
