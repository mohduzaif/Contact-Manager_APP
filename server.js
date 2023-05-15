const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const contactRouter = require("./routes/contactRoutes");
const userRouter = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");

const port = process.env.PORT || 3000;

connectDb();

// this is a middleware that provide a parser which helps to parse the incoming JSON object.
// it is just for POST and PUT request.
app.use(express.json());
app.use("/api/contacts", contactRouter);
app.use("/api/users", userRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
