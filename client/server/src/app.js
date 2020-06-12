const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const {sequelize} = require('./models');
//Mes constantes
const config = require('./config/config');
const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

require('./router/login')(app);

sequelize.sync()
    .then(() => {
        app.listen(config.port, () => {
            console.log(`MyDashboard is launch on port ${config.port}`);
        });
    });
