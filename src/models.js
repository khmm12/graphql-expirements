import { Model } from 'objection'
import Knex from 'knex'
import dbConfigs from '../knexfile'

const config = dbConfigs[process.env.NODE_ENV || 'development']

// Initialize knex connection.
var knex = Knex(config)

// Give the connection to objection.
Model.knex(knex)

export class Author extends Model {
  static tableName = 'authors'

  get fullName () {
    return [this.firstName, this.lastName].join(' ')
  }

  static get relationMappings () {
    return {
      posts: {
        relation: Model.HasManyRelation,
        modelClass: Post,
        join: {
          from: 'authors.id',
          to: 'posts.authorId'
        }
      }
    }
  }
}

export class Post extends Model {
  static tableName = 'posts'

  static relationMappings = {
    author: {
      relation: Model.BelongsToOneRelation,
      modelClass: Author,
      join: {
        from: 'posts.authorId',
        to: 'authors.id'
      }
    }
  }
}
