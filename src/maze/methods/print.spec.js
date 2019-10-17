import api from '../api.js';
import { print } from './print.js';

jest.mock('../api.js');

let mockedMaze = {};

beforeEach(async () => {
  mockedMaze = { print };
  await mockedMaze.print();
});

test('calls the underlying api', () => {
  expect(api.print).toHaveBeenCalled();
});
