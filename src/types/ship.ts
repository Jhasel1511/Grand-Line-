import { Crew } from './crew';
import { Character } from './character';

export interface Ship {
  id: number;
  name: string;
  description: string | null;
  type: string;
  roman_name: string;
  crew: Crew | null;
  character_captain: Character | null;
}
