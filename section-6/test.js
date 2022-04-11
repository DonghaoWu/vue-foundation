const data = {
  message: 'hello',
};

const handler = {
  set(target, key, value) {
    if (key === 'message') {
      target.longMessage = value + ' World';
    }
    target[key] = value;
  },
};

const proxy = new Proxy(data, handler);

proxy.message = 'Hello!!!!!';
