const { app, server } = require("./socket");
const router = require("./router/index");
const errorMiddleware = require("./middlewares/error-middleware");
const redisClient = require("./redisClient");

// Routes
app.use("/api", router);
app.use(errorMiddleware);

// Server start
server.listen(process.env.PORT, async () => {
    // await redisClient.connect();
    console.log(`Server is listening on port ${process.env.PORT}`);
});
