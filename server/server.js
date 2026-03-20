const { app, server } = require('./socket');
const router = require('./router/index');
const errorMiddleware = require('./middlewares/error-middleware');
const redisClient = require('./redisClient');

// Routes
app.use('/api', router);
app.use(errorMiddleware);

app.get('/', (req, res, next) => res.send('OK'));

// Server start
server.listen(process.env.PORT ?? 3000, async () => {
    await redisClient.connect();
    console.log(`Server is listening on port ${process.env.PORT}}`);
});
