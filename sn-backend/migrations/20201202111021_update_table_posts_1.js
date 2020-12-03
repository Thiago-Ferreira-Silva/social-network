
exports.up = function(knex) {
    return knex.schema.table('posts', table => {
        table.json('comments').defaultTo('[]')
        table.integer('likes').defaultTo(0)
    })
//adicione a data do post e talvez algo mais, como like ou melhorar a parte de comentários
};

exports.down = function(knex) {
    return knex.schema.table('posts', table => {
        table.dropColumn('comments')
    })
};
