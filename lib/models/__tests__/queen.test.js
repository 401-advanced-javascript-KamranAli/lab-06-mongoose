const Queen = require('../queen');
const mongoose = require('mongoose');

describe('Queen Model', () => {

  it('all valid model properties', () => {
    const queen = {
      name: 'Freddie Mercury',
      yearsActive: 32,
      frontMan: true,
      alias: {
        alias1: 'Farrokh Bulsara'
      },
      media: ['tv', 'internet']
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

  it('required properties validated', () => {
    const band = {};
    const queen = new Queen(band);
    const { errors } = queen.validateSync();
    expect(errors.name.kind).toBe('required');
    expect(errors.yearsActive.kind).toBe('required');
  });

  it('default properties populated', () => {
    const queen = {
      name: 'Freddie Mercury',
      yearsActive: 32,
      frontMan: true,
      alias: {
        alias1: 'Farrokh Bulsara'
      },
      media: ['tv', 'internet'],
    };
    const band = new Queen(queen);
    const err = band.validateSync();
    expect(err).toBeUndefined();

    expect(queen.frontMan).toBe(true);
  });

  it('max years active', () => {
    const queen = {
      yearsActive: 55
    };
    const band = new Queen(queen);
    const { errors } = band.validateSync();
    expect(errors.yearsActive.kind).toBe('max')
  })

  it('min years active', () => {
    const queen = {
      yearsActive: 30
    };
    const band = new Queen(queen);
    const { errors } = band.validateSync();
    expect(errors.yearsActive.kind).toBe('min');
  });

  it('enforces enum on media', () => {
    const queen = {
      media: ['magazine']
    };
    const band = new Queen(queen);
    const { errors } = band.validateSync();
    expect(errors['media.0'].kind).toBe('enum');
  });
});