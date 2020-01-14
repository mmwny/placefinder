import { readFileSync } from 'fs';
import path from 'path';
import { of } from 'rxjs';

const venues = JSON.parse(
  readFileSync(path.join(__dirname, 'venues.json')).toString()
)

export const _venues = venues;

const mock = {
  getLocations: jest.fn(() => {
    return of(venues)
  })
}

export default mock;