export interface UserAccount {
    id: number;
    username: string;
    email: string;
  }
  
  export interface AccountDetails extends UserAccount {
    password: string; // Note: Handling passwords securely is crucial
  }
  