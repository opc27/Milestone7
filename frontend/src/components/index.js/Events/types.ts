export interface Event {
    id: number;
    name: string;
    date: string;
    time: string;
    type?: string;
}
  
export interface EventFormData {
    type: string;
    date: string;
    time: string;
}
  