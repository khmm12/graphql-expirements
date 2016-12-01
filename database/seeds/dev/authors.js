import faker from 'faker'
import { range, random } from 'lodash'
import Promise from 'bluebird'

const AUTHORS_NUMBER = 100
const POSTS_NUMBER = 50

export async function seed (knex) {
  return knex.transaction(async knex => {
    await knex('authors').truncate()
    await knex('posts').truncate()

    await Promise.map(range(0, AUTHORS_NUMBER), async () => {
      const createdAt = new Date()
      const updatedAt = createdAt
      const [authorId] = await knex.insert({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        createdAt,
        updatedAt
      }).into('authors')

      const postsNumber = random(0, POSTS_NUMBER)
      await Promise.map(range(0, postsNumber), () =>
        knex.insert({
          authorId,
          title: faker.lorem.sentence(),
          text: faker.lorem.text(),
          createdAt,
          updatedAt
        }).into('posts')
      )
    }, { concurrency: 5 })
  })
}
