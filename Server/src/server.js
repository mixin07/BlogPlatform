const http = require('http');
const app = require('./app');

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
	// Log succinct startup info
	console.log(`Server listening on http://localhost:${PORT}`);
});


