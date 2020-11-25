const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

module.exports = () => {
    mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mshv9.mongodb.net/<dbname>?retryWrites=true&w=majority/${process.env.DB_NAME}`, 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }).then(()=>{
        console.log('Connection successful')
    }).catch(err => console.log(err.message));

    mongoose.connection.on('connected', () => {
        console.log('Mongoose connected to db...');
    });

    mongoose.connection.on('error', err => {
        console.log(err.message);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose connection is disconnected...');
    });

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log(
            'Mongoose connection is disconnected due to app termination...'
            );
            process.exit(0);
        });
    });

}