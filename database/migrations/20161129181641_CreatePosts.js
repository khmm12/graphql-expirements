export function up (knex) {
  return knex.schema.createTable('posts', table => {
    table.increments()
    table.string('title', 40)
    table.string('text')
    table.dateTime('createdAt')
    table.dateTime('updatedAt')
  })
}

export function down (knex) {
  return knex.schema.dropTable('posts')
}
