
exports.up = function(knex) {
    return knex.schema.createTable('posts' , table => {
        table.increments('id').primary()
        table.integer('user_id').unsigned()
        table.foreign('user_id').references('id').inTable('users')
        table.string('text', 600).notNull()
        table.boolean('image').notNull()
        table.json('comments')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('posts')
};
