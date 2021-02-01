
exports.up = function(knex) {
    return knex.schema.table('posts', table => {
        table.text('comments').defaultTo('[]')
        table.integer('likes').defaultTo(0)
    })
};

exports.down = function(knex) {
    return knex.schema.table('posts', table => {
        table.dropColumn('comments')
        table.dropColumn('likes')
    })
};
