import { AddUsuarioInput, LoadUsuarioOutput } from '@/domain/usecases'

export interface AddUsuarioRepository {
  add: (data: AddUsuarioInput) => Promise<LoadUsuarioOutput | null>
}
