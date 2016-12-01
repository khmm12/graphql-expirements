import { groupBy } from 'lodash'
import DataLoader from 'dataloader'
import { Author, Post } from '../models'

export default function loadersFactory (req) {
  return {
    database: { Author, Post },
    loaders: {
      PostsByAuthorIdLoader: new DataLoader(authorIds => {
        return Post.query()
        .whereIn('authorId', authorIds)
        .then(posts => {
          const groupedPosts = groupBy(posts, 'authorId')
          return authorIds.map(authorId => groupedPosts[authorId] || [])
        })
      }),

      AuthorByIdLoader: new DataLoader(ids => {
        return Author.query()
        .whereIn('id', ids)
        .then(authors => {
          const groupedAuthors = groupBy(authors, 'id')
          return ids.map(id => groupedAuthors[id] && groupedAuthors[id][0] || null)
        })
      })
    }
  }
}
