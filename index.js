const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerOptions = require("./swaggerOptions");
const userRoutes=require("./src/users/routes");
const todoRoutes = require('./src/todos/TodoRoutes');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());
/** api routes */
app.use("/todos",todoRoutes);
app.use("/user",userRoutes);

const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});