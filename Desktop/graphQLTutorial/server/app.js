import express from 'express';
import {graphqlHTTP} from 'express-graphql';
import schema from '../server/schemas/schema';
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv';
dotenv.config()

const app = express()
app.use(cors())

mongoose.connect(process.env.mongo_uri, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
});
mongoose.connection.once('open', () => {
    console.log('db connected success')
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

const port = 6060;

app.listen(port, () => console.log(`server running on port ${port}`));