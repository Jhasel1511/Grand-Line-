import { Crew } from './crew';
import { Fruit } from './fruit';

export interface Character {
  id: number;
  name: string;
  size: string | null;
  age: string | null;
  bounty: string | null;
  crew: Crew | null;
  fruit: Fruit | null;
  job: string | null;
  status: string;
}

export interface CharacterFilterOptions {
  search: string;
  crew: string;
  status: string;
  bountyRange: string;
}
