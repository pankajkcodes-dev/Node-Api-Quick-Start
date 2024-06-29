import app from "./app.js";
import connectDB from "./config/db.config.js";
import dotenv from "dotenv";
import os from 'os';
import cluster from "cluster";
dotenv.config();

const port = process.env.PORT;

connectDB()
    .then(() => {
        if (cluster.isPrimary) {
            console.log(os.cpus().length);

            for (let index = 0; index < os.cpus().length; index++) {
                cluster.fork();
            }
        } else {
            app.listen(process.env.PORT, () => {
                console.log(` ⚙️  Server is running at port : http://localhost:${port} Process Id : ${process.pid}`);
            })
        }
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    })


