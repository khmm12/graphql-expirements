const typeDefinitions = `
type Author {
  id: ID!
  firstName: String
  lastName: String
  fullName: String
  createdAt: String
  updatedAt: String
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String
  text(limit: Int): String
  createdAt: String
  updatedAt: String
  author: Author
}

type Query {
  authors(limit: Int, offset: Int): [Author]
  author(id: ID, firstName: String, lastName: String): Author
  posts(limit: Int, offset: Int): [Post]
}

schema {
  query: Query
}
`

export default [typeDefinitions]
