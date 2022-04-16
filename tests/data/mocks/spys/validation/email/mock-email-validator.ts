import { EmailValidator } from '@/validation'

export class EmailValidatorSpy implements EmailValidator {
  isEmailValid = true
  email!: String

  isValid (email: String): boolean {
    this.email = email
    return this.isEmailValid
  }
}
