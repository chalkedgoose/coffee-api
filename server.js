const {
    GraphQLServer
} = require('graphql-yoga');
const mongoose = require('mongoose');
const CoffeeShop = require('./models/CoffeeShop');
const fs = require('fs');
require('dotenv').config();

// import graphql schema 
require.extensions['.graphql'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

// schema initialization and db initialization
const typeDefs = require('./schema.graphql');
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true
});

const resolvers = {
    Query: {
        coffeeshops: async () => {
            try {
                const shops = await CoffeeShop.find();
                return shops;
            } catch (error) {
                console.error(error);
            }
        }
    },
    Mutation: {
        createCoffeeShop: async (_, {
            title,
            description,
            longitude,
            latitude
        }) => {
            try {
                const shop = new CoffeeShop({
                    title,
                    description,
                    longitude,
                    latitude
                });
                const response = await shop.save();
                return response
            } catch (error) {
                console.error(error);
            }
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
});

const options = {
    cors: {
        credentials: true,
        origin: ["*"]
    }
}

server.start(options, () => {
    console.log("server running on port 4000");
});