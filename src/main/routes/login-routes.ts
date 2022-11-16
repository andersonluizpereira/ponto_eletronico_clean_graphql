import { adaptRoute } from '@/main/adapters'
import { makeIncluirUsuarioController, makeLoginController } from '@/main/factories'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/incluir', adaptRoute(makeIncluirUsuarioController()))
  router.post('/login', adaptRoute(makeLoginController()))
}
