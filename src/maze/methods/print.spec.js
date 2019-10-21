import api from '../api';
import { print } from './print';

jest.mock('../api');

let mockedMaze = {};

beforeEach(async () => {
  mockedMaze = { print };
  await mockedMaze.print();
});

test('calls the underlying api', () => {
  expect(api.print).toHaveBeenCalled();
});
