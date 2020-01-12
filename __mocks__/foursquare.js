import { readFileSync } from 'fs';
import path from 'path';

const venues = JSON.parse(
  readFileSync(path.join(__dirname, 'foursquare.json')).toString()
)

export const _venues = venues;