import {ApiResponseModel} from '../../models/apiResponseModel';
import {LoginForm, SignupForm} from '../../models/authModel';
import {handleApiError} from '../../utils/handleError';
import AuthApi from '../../api/authApi';

class AuthService {
  constructor() {}

  async doSignup(signupData: SignupForm): Promise<ApiResponseModel> {
    try {
      const response: any = await AuthApi.register(signupData);
      if (response.status && response.data) {
        return response.data;
      }
      return {
        success: false,
        message: response.message,
        data: null,
        error: null,
      };
    } catch (error: any) {
      const errorMessage = handleApiError(error);
      return {success: false, message: errorMessage, data: null, error: error};
    }
  }

  async doLogin(LoginData: LoginForm): Promise<ApiResponseModel> {
    try {
      const response: any = await AuthApi.login(LoginData);
      if (response.status && response.data) {
        return response.data;
      }
      return {
        success: false,
        message: response.message,
        data: null,
        error: null,
      };
    } catch (error: any) {
      const errorMessage = handleApiError(error);
      return {success: false, message: errorMessage, data: null, error: error};
    }
  }

  async completeOnboarding(userId: string): Promise<ApiResponseModel> {
    try {
      const response: any = await AuthApi.completeOnboarding(userId);
      if (response.status && response.data) {
        return response.data;
      }
      return {
        success: false,
        message: response.message,
        data: null,
        error: null,
      };
    } catch (error: any) {
      const errorMessage = handleApiError(error);
      return {success: false, message: errorMessage, data: null, error: error};
    }
  }
}

export default new AuthService();
