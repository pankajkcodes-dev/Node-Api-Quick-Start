import express from "express";
import { errorHandler } from "./middlewares/error.middelwares.js";


const app = express();

// middlewares
app.use(express.json({ limit: "16mb" }));
app.use(express.urlencoded({ extended: true, limit: "16mb" }));
app.use('/uploads', express.static('../uploads/'));

/// import routes 
import healthcheckRouter from "./routes/healthcheck.routes.js";



/// app routes 
app.use('/api/v1/healthcheck', healthcheckRouter)



app.get("/", (req, res) => {
    res.send("Server running");
});

// common error handling middleware
app.use(errorHandler);


export default app;