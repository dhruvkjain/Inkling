const http = require('http');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const { app } = require(path.join(__dirname , 'app.js'));
const { socketConnection } = require(path.join(__dirname, 'config'));
const { connectToMongo } = require(path.join(__dirname, 'config'));

const server = http.createServer(app);
const port = process.env.PORT || 3000;

async function startserver(){
    
  await connectToMongo();
  // socketConnection(server);

  server.listen(port , ()=>{
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}
startserver();