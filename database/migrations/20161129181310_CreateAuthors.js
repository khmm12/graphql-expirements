export function up (knex) {
  return knex.schema.createTable('authors', table => {
    table.increments()
    table.string('firstName')
    table.string('lastName')
    table.dateTime('createdAt')
    table.dateTime('updatedAt')
  })
}

export function down (knex) {
  return knex.schema.dropTable('authors')
}
