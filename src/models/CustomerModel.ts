export interface StudentModel {
    studentName: string;
    location: string;
  }
  
  export interface CustomerRegistrationPayload {
    name: string;
    email: string;
    mobile: string;
    parentName: string;
    students: StudentModel[];
    plan: string;
    agreeTerms: boolean;
    price: number;
  }
  