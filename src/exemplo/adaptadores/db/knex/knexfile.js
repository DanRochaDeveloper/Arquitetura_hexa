const dotenv = require("dotenv")
dotenv.config({path:"../../../../.env"})

module.exports = {
    client: "pg",
    connection: "postgres://postgres:abc123@localhost:5432/test_hexa_struct",
    migrations: {
        tableName: "knex_migrations",
    },
    pool: {
        min: 2,
        max: 10,
    }

}