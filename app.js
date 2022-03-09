import express from 'express';
import cors from 'cors';

var corsOptions = {
    origin: "http://localhost:8081"
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send({message: 'Welcome to the first route.'});
});


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});