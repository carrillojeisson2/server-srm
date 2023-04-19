const { ApolloServer, gql } = require('apollo-server');
const conectarDB = require('./config/db');
const resolvers = require('./db/resolvers');
const typeDefs = require('./db/schema');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });




// conectar db
conectarDB();



// servidor
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        // console.log(req.headers['authorization'])

        console.log(req.headers)

        const token = req.headers['authorization'] || '';
        if (token) {
            try {
                const usuario = jwt.verify(token.replace('Bearer ', ''), process.env.SECRETA);

                console.log(usuario);

                return {
                    usuario
                }
            } catch (error) {
                console.log('Hubo un error')
                console.log(error)
            }
        }

    }
});

// arrancar el servidor
server.listen().then(({ url }) => {
    console.log(`Servidor listo en la url ${url}`);
})