export default {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://localhost:27017/ponto-eletronico-node-api',
  port: process.env.PORT ?? 5000,
  jwtSecret: process.env.JWT_SECRET ?? 'tj67O==5H'
}
