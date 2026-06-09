const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Application Running');
});

app.get('/health', (req, res) => {
  res.status(200).send('healthy');
});

app.listen(3000, '0.0.0.0', () => {
  console.log('Server running on port 3000');
});
app.get('/metrics', (req, res) => {
  res.send('metrics placeholder');
});
