import { RequestsState } from './requests/types';
import { CoachesState } from './coaches/types';


type RootState = {  requests: RequestsState; coaches: CoachesState; };  


export type { RootState };