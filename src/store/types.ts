// import { RequestsState } from './requests/types';


export interface Profession {
  id: number;
  name: string;
  selected: boolean;
}


export interface Coach {
  id: string;
  firstName: string;
  lastName: string;
  description: string;
  hourlyRate: number;
  areas: string[];
  profession: Profession;
}

export interface CoachesState {
  coaches: Coach[];
  selectedProfessions: Profession[];
  isLoading: boolean;
  error: string | null;
}

type RootState = { coaches: CoachesState };

export type { RootState };
