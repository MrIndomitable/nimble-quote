const app = require('./server');

const PORT = (process.env as any).PORT || 5000;
app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});