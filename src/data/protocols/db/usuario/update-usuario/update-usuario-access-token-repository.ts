import { UpdateUsuarioAccessTokenInput } from '@/domain/usecases'

export interface UpdateUsuarioAccessTokenRepository {
  update: (updateUsuarioAccessTokenInput: UpdateUsuarioAccessTokenInput) => Promise<void>
}
