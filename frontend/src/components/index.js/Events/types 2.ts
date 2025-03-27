export interface Event {
    id: number;
    name: string;
    date: string;
    time: string;
    location: string;
    description: string;
    type?: string;
    temple?: string;
  }
  
  export interface EventFormData {
    type: string;
    temple: string;
    date: string;
    time: string;
    location: string;
    description: string;
  }
  