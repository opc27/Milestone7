export interface ModuleData {
    id: number;
    title: string;
    subtitle: string;
    status: "completed" | "active" | "locked";
  }
  
  export interface ModuleCardProps {
    module: ModuleData;
  }
  
  export interface HeaderProps {
    time?: string;
    userImage?: string;
  }
  
  export interface ProgressBarProps {
    progress: number; // 0-100
  }
  