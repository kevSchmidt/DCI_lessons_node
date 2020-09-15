const mongoose = require('mongoose');
const dotenv = require('dotenv');

// ======== Uncaught Exception ===
process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  process.exit(1); // exit the application

  // **HERE**: an other service should restart the app.
});
// ---- Error trigger ----
// console.log(x);

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// ======== MongoDB ===
mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection successful!'));

// ======== Start Server ===
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// ======== Unhandled Rejection ===
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
});
