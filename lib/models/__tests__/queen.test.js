const Queen = require('../queen');
// const mongoose = require('mongoose');

describe('Queen Model', () => {

  it('all valid model properties', () => {
    const queen = {
      name: 'Freddie Mercury',
      yearsActive: 32,
      frontMan: true,
      alias: {
        alias1: 'Farrokh Bulsara'
    },
    media: ['tv','internet'], 
  };

  const band = new Queen(queen);
  const errors = band.validateSync();
  expect(errors).toBeUndefined();

  const json = band.toJSON();

  expect(json).toEqual({
    ...queen,
    _id: expect.any(Object),
  });
});




})