export default class Cpf {
  value: string

  constructor (value: string) {
    if (!this.validate(value)) throw new Error('CPF inválido')
    this.value = value
  }

  private validate (cpf: String): boolean {
    if (!cpf) return false
    cpf = this.clean(cpf.toString())
    if (!this.hasMinimumLength(cpf.toString())) return false
    if (this.isBlocked(cpf.toString())) return false
    const digit1 = this.calculateDigit(cpf.toString(), 10)
    const digit2 = this.calculateDigit(cpf.toString(), 11)
    const calculatedDigit = `${digit1}${digit2}`
    const actualDigit = cpf.slice(9)
    return actualDigit === calculatedDigit
  }

  private calculateDigit (cpf: string, factor: number): number {
    let total = 0
    for (const digit of cpf) {
      if (factor > 1) total += parseInt(digit) * factor--
    }
    const rest = total % 11
    return (rest < 2) ? 0 : 11 - rest
  }

  private clean (cpf: string): string {
    return cpf.replace(/\D/g, '')
  }

  private hasMinimumLength (cpf: string): boolean {
    return cpf.length === 11
  }

  private isBlocked (cpf: string): boolean {
    const [firstDigit] = cpf
    return [...cpf].every(digit => digit === firstDigit)
  }
}
