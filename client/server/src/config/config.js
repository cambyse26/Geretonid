module.exports = {
    port: process.env.Port || 4040,
    db: {
        database: process.env.DB_NAME || 'UserDB',
        user: process.env.DB_USER || 'UserDB',
        password: process.env.DB_PASS || 'UserDB',
        options: {
            dialect: process.env.DIALECT || 'sqlite',
            host: process.env.Host || 'localhost',
            storage:'./UserDB.sqlite'
        }
    },
    authentification: {
        jwtSecret: process.env.JWT_SECRET || 'secret'
    }
}