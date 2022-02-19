export enum Roles {
  USER = "USER",
  ADMIN = "admin"
}

export interface User {
  _id: string;
  email: string;
  role: string;
}

export interface Event {
  _id?: string;
  uid?: string;
  start: string;
  end: string;
  summary: string;
  description: string;
  allDay: boolean;
  location: string;
}

export interface Scheduled {
  _id: string;
  "eventId": string,
  "date": string,
  summary: string,
}

export interface Request extends Event {
  _id: string;
  owner: string;
  date: string;
}
