import express from 'express'
import logger from 'morgan'
import { apolloExpress, graphiqlExpress } from 'apollo-server'
import bodyParser from 'body-parser'
import { executableSchema } from './data'
import loadersFactory from './data/loaders'

const GRAPHQL_PORT = process.env.GRAPHQL_PORT || 8080

const graphqlApp = express()

graphqlApp.use(logger('tiny'))

graphqlApp.use('/graphql', bodyParser.json(), apolloExpress(req => ({
  schema: executableSchema,
  context: { ...loadersFactory(req) }
})))

graphqlApp.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}))

graphqlApp.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphql`
))
