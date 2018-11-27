import fastify from 'fastify';
import fastifyStatic from 'fastify-static';
import { join } from 'path';
import { randomBytes } from 'crypto';
import { URL } from 'url';

const serverAddr = process.env.ADDR || '127.0.0.1';
const serverPort = Number(process.env.PORT) || 8080;
const inMemStore: Map<string, string> = new Map();

const server = fastify({
  logger: false,
});

server.register(fastifyStatic, {
  root: join(process.cwd(), 'public'),
});

server.get('/', (_, res) => {
  console.log('test');
  res.sendFile('index.html');
});

server.put('/', (req, res) => {

  const fullurl = req.body.url;
  let urlparsed;
  
  if (fullurl === undefined || fullurl === '') {
    res.code(400);
    res.send(new Error('URL required'));
  } else {
    // generate hash
    const hash = randomBytes(4).toString('hex');

    try {
      urlparsed = new URL(fullurl);
      inMemStore.set(hash, urlparsed.toString())
      res.code(200);
      res.send(`http://${serverAddr}:${serverPort}/${hash}`);
    } catch (e) {
      res.code(400);
      res.send(new Error('Invalid URL'))
    }

  }
})

server.get('/:hash', (req, res) => {

  // TODO: Refactor: Redis instead of in memory map.

  const fullurl: string | undefined = inMemStore.get(req.params.hash);
  if (fullurl !== undefined) {
    res.redirect(302, fullurl)
  } else {
    // show error
    res.code(404);
    res.send(new Error('Shortened url not found.'));
  }

});

server.listen(serverPort, serverAddr, (err, addr) => {
  if (err) throw err;
  console.log(`now listening at ${addr}`);
});
