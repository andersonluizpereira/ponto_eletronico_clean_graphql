import paths from './paths'
import components from './components'
import schemas from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Treinamento para Programadores',
    description: 'Essa é a documentação da API feita pelo professor Anderson Pereira usando tecnologia NodeJs usando Typescript, TDD, Clean Architecture.',
    version: '1.0.0',
    contact: {
      name: 'Anderson Pereira',
      email: 'andy2903.alp@gmail.com',
      url: 'https://www.linkedin.com/in/rmanguinho'
    },
    license: {
      name: 'GPL-3.0-or-later',
      url: 'https://spdx.org/licenses/GPL-3.0-or-later.html'
    }
  },
  servers: [{
    url: '/api',
    description: 'Servidor Principal'
  }],
  tags: [{
    name: 'Login',
    description: 'APIs relacionadas a Login'
  }],
  paths,
  schemas,
  components
}
