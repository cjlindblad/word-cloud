import memoryCache from 'memory-cache';

// adopted from https://medium.com/the-node-js-collection/simple-server-side-cache-for-express-js-with-node-js-45ff296ca0f0
const cache = (duration: number) => {
  return (req: any, res: any, next: any) => {
    let key = '__express__' + req.originalUrl || req.url;
    let cachedBody = memoryCache.get(key);

    if (cachedBody) {
      res.send(cachedBody);
      return;
    }

    res.sendResponse = res.send;
    res.send = (body: any) => {
      memoryCache.put(key, body, duration * 1000);
      res.sendResponse(body);
    };
    next();
  };
};

export default cache;
