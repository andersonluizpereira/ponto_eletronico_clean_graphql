import { Validation } from '@/presentation/protocols'
import { EmailValidatorAdapter } from '@/infra/validators'
import { CompareFieldsValidation, EmailValidation, RequiredFieldValidation, ValidationComposite } from '@/validation'

export const makeIncluirUsuarioValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of [
    'nome',
    'cpf',
    'rg',
    'dataNascimento',
    'telefone',
    'tokenAcesso',
    'email',
    'password',
    'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
