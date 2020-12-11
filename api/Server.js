const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

const userRoutes = require('./userRouter');
app.use('/',userRoutes);
app.use(express.static('uploads'));

const userDetails = require('./userDetails');
app.use('/user',userDetails);

const otherThings = require('./otherThings');
app.use('/other',otherThings);

app.listen(process.env.PORT || 3000,function(){
    console.log("Server running at port 3000");
})