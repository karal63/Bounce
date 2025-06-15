const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const router = require("./router/index");

app.use(express.json());
app.use(
    cors({
        credentials: true,
    })
);
app.use("/api", router);

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});
