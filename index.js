const express = require('express');
const httpProxy = require('http-proxy');

const app = express();
const proxy = httpProxy.createProxyServer();

app.use('/status', (req, res) => {
  proxy.web(req, res, { target: 'http://93.153.199.250:8080/mlat/status' });
});

app.listen(3000, () => {
  console.log('Proxy server is running on port 3000');
});
