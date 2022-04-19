import express from 'express';
import mongoose from 'mongoose';
import Cards from './dbCards.js';
import Cors from 'cors'


//App Config
const app = express();
const port = process.env.PORT || 8001;
const connection_url='mongodb+srv://admin:c9nJCJsvFlyfLq3R@cluster0.w0xdb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

//middlewares
app.use(express.json());
app.use(Cors());

//DB Config
mongoose.connect(connection_url)


//API End Points 
app.get('/', (req, res) => res.status(200).send('Hello World'));

app.post('/tinder/card',(req, res) => {
    const dbCard =  req.body;

    Cards.create(dbCard, (err, data) => {
        if(err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
});

app.get('/tinder/card', (req, res) => {
    Cards.find((err, data) => {
        if(err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    });
});

// Listener 
app.listen(port, () => console.log(`Server is running on port ${port}`));

