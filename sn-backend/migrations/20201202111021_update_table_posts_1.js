
exports.up = function(knex) {
    return knex.schema.table('posts', table => {
        table.string('user_name')
    })
//adicione a data do post e talvez algo mais, como like ou melhorar a parte de comentários
};

exports.down = function(knex) {
    return knex.schema.table('posts', table => {
        table.dropColumn()
    })
};
