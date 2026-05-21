
const express = require('express');

const mongoose = require('mongoose');

const cors = require('cors');

const dotenv = require('dotenv');

dotenv.config();

const app = express();

// MIDDLEWARE
app.use(cors());

app.use(express.json());

// ROUTES
app.use(
  '/api/auth',
  require('./routes/auth')
);

app.use(
  '/api/jobs',
  require('./routes/jobs')
);

app.use(
  '/api/profile',
  require('./routes/profile')
);

app.use(
  '/api/trash',
  require('./routes/trash')
);

// TEST ROUTE
app.get('/', (req, res) => {

  res.send(
    'TrackHire Backend Running'
  );

});

// CONNECT REAL MONGODB ATLAS
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Atlas Connected');

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('MongoDB Error:', err);
  });
