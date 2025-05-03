// import { RequestsState } from './requests/types';
export type Skill = "Frontend" | "Backend" | "Full Stack";

export interface Profession {
  id: number;
  name: Skill;
  selected: boolean;
  toLowerCase: () => string;
}

export interface Coach {
  id: number;
  firstName: string;
  lastName: string;
  description: string;
  pricePerHour: number;
  skills: Skill[];
}

export type FirebaseTimestamp = {
  seconds: number;
  nanoseconds: number;
};

export const convertFirebaseTimestamp = (
  timestamp: FirebaseTimestamp
): Date => {
  return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
};

export interface Request {
  id: number;
  firstname: string;
  lastname: string;
  message: string;
  requestDate: FirebaseTimestamp;
  requestedBy: string;
  email: string;
}

export interface ProcessedRequest extends Omit<Request, "requestDate"> {
  requestDate: Date;
  formattedDate: string;
}

export interface RequestData {
  id: number;
  firstname: string;
  lastname: string;
  fullname: string;
  email: string;
  message: string;
  requestDate: Date;
  requestedBy: string;
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
  requests: ProcessedRequest[];
  isLoading: boolean;
  error: string | null;
}

type RootState = { coaches: CoachesState; requests: RequestsState };

export type { RootState };
