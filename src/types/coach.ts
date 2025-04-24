export interface Coach {
  id: string;
  firstName: string;
  lastName: string;
  description: string;
  hourlyRate: number;
  areas: string[];
  profession: string;
}

export interface CoachesState {
  coaches: Coach[];
  selectedProfessions: string[];
  isLoading: boolean;
  error: string | null;
}
