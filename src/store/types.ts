// import { RequestsState } from './requests/types';
export type Skill = "Frontend" | "Backend" | "Full Stack";

export interface Profession {
  id: number;
  name: Skill;
  selected: boolean;
  toLowerCase: () => string;
}


export interface Coach {
  id: string;
  firstName: string;
  lastName: string;
  description: string;
  pricePerHour: number;
  skills: Skill[];
}

export interface CoachesState {
  coaches: Coach[];
  selectedProfessions: Profession[];
  isLoading: boolean;
  error: string | null;
  selectedCoach: Coach | null;
  shouldAnimateInitialLoad: boolean;
  isLoaded: boolean;
}

export interface RequestsState {
  requests: Request[];
  isLoading: boolean;
  error: string | null;
}


type RootState = { coaches: CoachesState, requests: RequestsState };

export type { RootState };
