export function validateEmail(email: string): void {
  if (!email) {
    throw new Error('Email is required');
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Please enter a valid email address');
  }
}

export function validatePassword(password: string): void {
  if (!password) {
    throw new Error('Password is required');
  }
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    throw new Error(
      'Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character',
    );
  }
}
