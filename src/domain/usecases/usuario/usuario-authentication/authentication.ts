export type AuthenticationInput = {
  email: string
  password: string
}

export type UsuarioAuthenticationOutput = {
  tokenAcesso: string
  nome: string
}

export interface UsuarioAuthentication {
  auth: (authenticationParams: AuthenticationInput) => Promise<UsuarioAuthenticationOutput>
}
