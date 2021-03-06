
exports.up = function(knex) {
    return knex.schema.createTable('posts' , table => {
        table.increments('id').primary()
        table.integer('user_id').unsigned()
        table.foreign('user_id').references('id').inTable('users')
        table.string('text', 600).notNull()
        table.binary('image')
        table.datetime('date').notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('posts')
};
