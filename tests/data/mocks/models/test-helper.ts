import { EmailInUseError } from '@/presentation/errors'

export const throwError = (): never => {
  throw new Error()
}

export const forbiddenError = (): never => {
  throw new EmailInUseError()
}
