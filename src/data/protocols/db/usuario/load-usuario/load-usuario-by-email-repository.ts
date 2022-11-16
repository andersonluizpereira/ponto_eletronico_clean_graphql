import { LoadUsuarioByEmailInput, LoadUsuarioByEmailOutput } from '@/domain/usecases'

export interface LoadUsuarioByEmailRepository {
  loadByEmail: (loadUsuarioByEmailInput: LoadUsuarioByEmailInput) => Promise<LoadUsuarioByEmailOutput>
}
