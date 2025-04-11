// src/models/User.ts
export interface SignupForm {
  fullname: string;
  email: string;
  password: string; // Add phone_number here
}

// src/models/User.ts
export interface LoginForm {
  email: string;
  password: string;
}

// src/models/authModel.ts
export interface AuthToken {
  authToken: string;
}

export interface LoggedUser {
  id: number;
  userId?: string;
  name: string;
  email: string;
  phone_number: string;
  role_id: number;
  authToken: string;
}

export interface AuthResponse {
  user: LoggedUser;
  token: AuthToken;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordReset {
  token: string;
  newPassword: string;
}
