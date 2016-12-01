import { makeExecutableSchema } from 'graphql-tools'
import Schema from './schema'
import Resolvers from './resolvers'

export const executableSchema = makeExecutableSchema({
  typeDefs: Schema,
  resolvers: Resolvers,
  allowUndefinedInResolve: false,
  printErrors: true
})
