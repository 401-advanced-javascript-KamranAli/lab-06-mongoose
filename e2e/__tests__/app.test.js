const request = require('../request');

describe('app api', () => {
  it('alive', () => {
    return request
      .get('/hello')
      .expect(200)
      .then(res => {
        expect(res.text).toBe('hello express');
      });
  });

  it('return a 404 on nonapi bad request', () => {
    return request
      .get('/bad-path')
      .expect(404)
      .expect('Content-Type', /text/);
  });

  it('return app/json 404 on bad api path', () => {
    return request
      .post('/api/bad-path')
      .expect(404)
      // .expect('Content-Type, /json/')
      .then(res => {
        expect(res.body.error).toMatch(/not found/i);
      });
  });
});