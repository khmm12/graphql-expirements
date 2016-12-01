export function up (knex) {
  return knex.schema.table('posts', table => {
    table.integer('authorId').unsigned().index()
  })
}

export function down (knex) {
  return knex.schema.table('posts', table => {
    table.dropColumn('authorId')
  })
}
