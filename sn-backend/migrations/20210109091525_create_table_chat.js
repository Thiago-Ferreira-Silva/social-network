
exports.up = function(knex) {
    return knex.schema.createTable('chats', table => {
        table.integer('id1').unsigned()
        table.integer('id2').unsigned()
        table.foreign('id1').references('id').inTable('users')
        table.foreign('id2').references('id').inTable('users')
        table.text('messages').defaultTo('[]')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('chats')
};
