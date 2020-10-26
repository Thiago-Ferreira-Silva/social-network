exports.up = function(knex) {
    return knex.schema.table('users', table => {
        table.text('bio')
        table.json('friends')
    })
};

exports.down = function(knex) {
    return knex.schema.table('users', table => {
        table.dropCollumn('bio')
        table.dropCollumn('friends')
    })
};
