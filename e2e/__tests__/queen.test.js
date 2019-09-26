const request = require('../request');
const db = require('../db');

describe('queen api', () => {

  beforeEach(() => {
    return db.dropCollection('queens');
  });

  const freddie = {
    name: 'Freddie Mercury',
    yearsActive: 32,
    frontMan: true,
    alias: {
      alias1: 'Farrokh Bulsara'
    },
    media: ['tv', 'internet']
  };

  function postQueen(queen) {
    return request
      .post('/api/queen')
      .send(queen)
      .expect(200)
      .then(({ body }) => body);
  }

  it('post a bandmember', () => {
    return postQueen(freddie)
      .then(queen => {
        expect(queen).toEqual({
          _id: expect.any(String),
          __v: 0,
          ...freddie
        });
      });
  });

  it('it gets a bandmember by id', () => {
    return postQueen(freddie)
      .then(queen => {
        return request.get(`/api/queen/${queen._id}`)
          .then(({ body }) => {
            expect(body).toEqual(queen);
          });
      });
  });

  it('it gets a list of bandmembers', () => {
    return Promise.all([
      postQueen({ name: 'freddie1', yearsActive: 32, frontMan: true }),
      postQueen({ name: 'freddie1', yearsActive: 32, frontMan: true }),
      postQueen({ name: 'freddie1', yearsActive: 32, frontMan: true }),
    ])
      .then(() => {
        return request
          .get('/api/queen')
          .expect(200);
      })
      .then(({ body }) => {
        expect(body.length).toBe(3);
      });
  });

  it('it updates queen', () => {
    return postQueen(freddie)
      .then(queen => {
        queen.yearsActive = 40;
        return request
          .put(`/api/queen/${queen._id}`)
          .send(queen)
          .expect(200);
      })
      .then(({ body }) => {
        expect(body.yearsActive).toBe(40);
      });
  });

  it('deletes a band member', () => {
    return postQueen(freddie)
      .then(queen => {
        return request
          .delete(`/api/queen/${queen._id}`)
          .expect(200);
      });
  });
});