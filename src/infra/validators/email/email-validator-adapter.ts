import { EmailValidator } from '@/validation/protocols/email/email-validator'
import validator from 'validator'
export class EmailValidatorAdapter implements EmailValidator {
  isValid (email: String): boolean {
    return validator.isEmail(email as any)
  }
}
