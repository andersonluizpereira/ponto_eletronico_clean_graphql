import {
  accountSchema,
  loginParamsSchema,
  errorSchema,
  incluirUsuarioParamsSchema
} from './schemas/'

export default {
  account: accountSchema,
  loginParams: loginParamsSchema,
  incluirUsuarioParams: incluirUsuarioParamsSchema,
  error: errorSchema
}
