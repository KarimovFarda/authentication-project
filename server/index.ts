import mongoose from 'mongoose'
import express from 'express';
import cors from 'cors';
import ROUTES from './routes';
import 'dotenv/config'

const uri = `${process.env.MONGODB_URL}`;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

});

const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", () => console.log("Database Connected"))

export const app = express();
app.use(cors());
app.use(express.json());

const port = 8805;

ROUTES.forEach(route => {
    app.use(route.path, route.router);
})


app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});