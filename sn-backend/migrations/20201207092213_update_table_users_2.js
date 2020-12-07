
exports.up = function(knex) {
    return knex.schema.table('users', table => {
        table.text('likedPosts').defaultTo('{}')
    })
};

exports.down = function(knex) {
    return knex.schema.table('users', table => {
        table.dropColumn('likedPosts')
    })
};
