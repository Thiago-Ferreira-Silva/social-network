
exports.up = function(knex) {
    return knex.schema.createTable('profile_pictures', table => {
        table.integer('user_id').unsigned()
        table.foreign('user_id').references('id').inTable('users')
        table.binary('image')
    })
}

exports.down = function(knex) {
    return knex.schema.dropTable('profile_pictures')
}
