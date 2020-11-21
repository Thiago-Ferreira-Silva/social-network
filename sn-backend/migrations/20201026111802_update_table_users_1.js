exports.up = function(knex) {
    return knex.schema.table('users', table => {
        table.text('bio')
        table.text('friends')
    })
};

exports.down = function(knex) {
    return knex.schema.table('users', table => {
        table.dropColumn('bio')
        table.dropColumn('friends')
    })
};
