const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const { scanStatuses } = require('./getStatus');

express()
  .get('/', (req, res) => res.send('Hello'))
  .listen(PORT, () => {
     console.log(`Listening on ${ PORT }`);
     console.log('Run scan statuses job');
     scanStatuses.start();
  });

