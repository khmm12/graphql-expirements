const resolvers = {
  Query: {
    authors (_, { limit, offset }, { database: { Author } }) {
      let authors = Author.query()
      if (limit) authors = authors.limit(limit)
      if (offset) authors = authors.offset(offset)
      return authors
    },
    author (_, args, { database: { Author } }) {
      return Author.query()
      .where(args)
      .limit(1)
      .then(authors => authors[0])
    },
    posts (_, { limit, offset }, { database: { Post } }) {
      let posts = Post.query()
      if (limit) posts = posts.limit(limit)
      if (offset) posts = posts.offset(offset)
      return posts
    }
  },
  Author: {
    posts (author, _, { loaders: { PostsByAuthorIdLoader } }) {
      return PostsByAuthorIdLoader.load(author.id)
    }
  },
  Post: {
    author (post, _, { loaders: { AuthorByIdLoader } }) {
      return AuthorByIdLoader.load(post.authorId)
    },
    text (post, { limit }) {
      const { text } = post
      return (text || '').slice(0, limit)
    }
  }
}

export default resolvers
