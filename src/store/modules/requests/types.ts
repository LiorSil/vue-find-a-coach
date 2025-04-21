export interface Request {
  status: "pending" | "accepted" | "rejected";
}

export interface RequestsState {
  requests: Request[];
 
}
