import customerApi from '../../api/customer/customerApi';
import httpAxiosClient from '../../config/httpclient';
import { ApiResponseModel } from '../../models/apiResponseModel';
import { CustomerRegistrationPayload } from '../../models/CustomerModel';
import { handleApiError } from '../../utils/handleError';

class CustomerService {
  static async registerCustomer(
    payload: CustomerRegistrationPayload
  ): Promise<ApiResponseModel> {
    try {
      const response = await customerApi.registerCustomer(payload);
      return response;
    } catch (error: any) {
      return {
        success: false,
        message: 'Customer registration failed',
        data: null,
        error: handleApiError(error),
      };
    }
  }

  static async getAvailableProducts(): Promise<ApiResponseModel> {
    try {
      const response = await httpAxiosClient.get('/products');
      
      return response.data;
      cons
    } catch (error: any) {
      return {
        success: false,
        message: 'Failed to fetch products',
        data: null,
        error: handleApiError(error),
      };
    }
  }


  static async getCalendarSelections(): Promise<ApiResponseModel> {
    try {
      const response = await httpAxiosClient.get('/orders/calendar');
      return response.data;
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch calendar data',
        data: null,
        error: handleApiError(error)
      };
    }
  }
  
  static async saveMenuSelection(payload: {
    date: string;
    productId: string;
    studentId: string;
  }): Promise<any> {
    try {
      const response = await httpAxiosClient.post('/orders/calendar', payload);
      return response.data;
    } catch (error) {
      return {
        success: false,
        message: 'Failed to save selection',
        data: null,
        error: handleApiError(error)
      };
    }
  }
}


export default CustomerService;