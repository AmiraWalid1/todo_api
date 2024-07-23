const {app} = require('./app');
const {connectDB}  = require('./models/db')
const port = 3000 || process.env.port;

// Start server
app.listen(port, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${port}`);
});
