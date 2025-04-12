import httpAxiosClient from '../config/httpclient';
import { ApiResponseModel } from '../models/apiResponseModel';

// Define interfaces for request/response types
interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  // Add other registration fields as needed
}

interface OnboardingData {
  // Define the structure of onboarding data
  [key: string]: any;
}

interface TokenRefreshData {
  token: string;
}

/**
 * Class representing the authentication API with enhanced error handling and type safety.
 */
class AuthApi {
  private readonly authEndpoint: string = '/auth';

  /**
   * Handle user login with credentials
   */
  async login(credentials: LoginCredentials): Promise<ApiResponseModel> {
    try {
      const response = await httpAxiosClient.post(
        `${this.authEndpoint}/login`,
        credentials
      );
      return response.data;
    } catch (error) {
      console.error('Login failed:', error);
      throw this.handleApiError(error);
    }
  }

  /**
   * Handle user registration
   */
  async register(userData: RegisterData): Promise<ApiResponseModel> {
    try {
      const response = await httpAxiosClient.post(
        `${this.authEndpoint}/register`,
        userData
      );
      return response.data;
    } catch (error) {
      console.error('Registration failed:', error);
      throw this.handleApiError(error);
    }
  }

  /**
   * Handle user logout
   */
  async logout(): Promise<ApiResponseModel> {
    try {
      const response = await httpAxiosClient.post(`${this.authEndpoint}/logout`);
      return response.data;
    } catch (error) {
      console.error('Logout failed:', error);
      throw this.handleApiError(error);
    }
  }

  /**
   * Refresh authentication token
   */
  async refreshToken(token: string): Promise<ApiResponseModel> {
    try {
      const response = await httpAxiosClient.post(
        `${this.authEndpoint}/refresh-token`,
        { token } as TokenRefreshData
      );
      return response.data;
    } catch (error) {
      console.error('Token refresh failed:', error);
      throw this.handleApiError(error);
    }
  }

  /**
   * Verify user role
   */
  async verifyRole(role: string): Promise<ApiResponseModel> {
    try {
      const response = await httpAxiosClient.get(
        `${this.authEndpoint}/verify-role`,
        { params: { role } }
      );
      return response.data;
    } catch (error) {
      console.error('Role verification failed:', error);
      throw this.handleApiError(error);
    }
  }

  /**
   * Verify user email
   */
  async verifyEmail(email: string): Promise<ApiResponseModel> {
    try {
      const response = await httpAxiosClient.get(
        `${this.authEndpoint}/verify-email`,
        { params: { email } }
      );
      return response.data;
    } catch (error) {
      console.error('Email verification failed:', error);
      throw this.handleApiError(error);
    }
  }

  /**
   * Complete onboarding process
   */
  async completeOnboarding(userInfo: OnboardingData): Promise<ApiResponseModel> {
    try {
      const response = await httpAxiosClient.post(
        `${this.authEndpoint}/complete-onboarding`,
        userInfo
      );
      return response.data;
    } catch (error) {
      console.error('Onboarding completion failed:', error);
      throw this.handleApiError(error);
    }
  }

  /**
   * Handle API errors consistently
   */
  private handleApiError(error: any): Error {
    // Customize error handling based on your API's error structure
    if (error.response) {
      // The request was made and the server responded with a status code
      const { status, data } = error.response;
      return new Error(data.message || `API request failed with status ${status}`);
    } else if (error.request) {
      // The request was made but no response was received
      return new Error('No response received from server');
    } else {
      // Something happened in setting up the request
      return new Error(error.message || 'An unknown error occurred');
    }
  }
}

// Export a singleton instance
export default new AuthApi();
