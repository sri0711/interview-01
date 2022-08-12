const mongoose = require('mongoose');

const url = `mongodb+srv://sri0711:${process.env.DBPASS}@chatdev.muaem.mongodb.net/interview-task?retryWrites=true&w=majority`;

console.log('Trying to connect mongo db Please wait a Moment!.');
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });
