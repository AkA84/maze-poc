import { createNewMaze } from "./sagas";
import { put, call } from 'redux-saga/effects'
import { setError, setLoading, setMaze } from "./actions";
import { createMaze } from "../maze";

describe('createNewMaze Saga test', () => {
  let gen;
  let mockedPayload = { foo: 'foo', bar: 'bar' };

  beforeAll(() => {
    gen = createNewMaze({ payload: mockedPayload });
  })

  it('first removes any error', () => {
    const val = gen.next().value;

    expect(val).toEqual(put(setError(null)));
  });

  it('then signals that the maze is loading', () => {
    const val = gen.next().value;

    expect(val).toEqual(put(setLoading(true)));
  });

  it('then actually loads the maze', () => {
    const val = gen.next().value;

    expect(val).toEqual(call(createMaze, mockedPayload));
  });

  it('then stores the new maze', () => {
    const mockedMaze = { data: {} };
    const val = gen.next(mockedMaze).value;

    expect(val).toEqual(put(setMaze(mockedMaze)));
  });

  it('finally signals that the maze has loaded', () => {
    const val = gen.next().value;

    expect(val).toEqual(put(setLoading(false)));
  });

  describe('when an exception is thrown', () => {
    let error;

    beforeEach(() => {
      error = Error('some error message');
    });

    it('then stores the error message', () => {
      const val = gen.throw(error).value;

      expect(val).toEqual(put(setError(error.message)));
    });
  });
});
