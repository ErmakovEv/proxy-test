const express = require('express');
const httpProxy = require('http-proxy');
const http = require('http');
const cors = require('cors');

function responseHandler(res) {
  return (resp) => {
    let data = '';

    if (typeof resp !== 'object' || !resp) {
      return;
    }

    // При получении каждого фрагмента данных
    if ('on' in resp && typeof resp.on === 'function') {
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // Когда ответ полностью получен, выводим результат.
      resp.on('end', () => {
        res.end(data);
      });
    }
  };
}

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: 'https://mon-test.netlify.app/',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'cookie'],
  })
);

app.use('/proxy', async (req, res) => {
  await http.get(
    'http://93.153.199.250:8080/mlat/status',
    responseHandler(res)
  );
});

// app.use('/status', (req, res) => {
//   proxy.web(req, res, { target: 'http://93.153.199.250:8080/mlat/status' });
// });

app.listen(8080, () => {
  console.log('Proxy server is running on port 8080');
});
