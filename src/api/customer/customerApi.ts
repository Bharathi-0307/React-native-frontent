import httpAxiosClient from '../../config/httpclient';
import { ApiResponseModel } from '../../models/apiResponseModel';
import { CustomerRegistrationPayload } from '../../models/CustomerModel';


class CustomerApi {
  private customerEndpoint: string;

  constructor() {
    this.customerEndpoint = '/customers';
  }

  async registerCustomer(
    customerData: CustomerRegistrationPayload
  ): Promise<ApiResponseModel> {
    return await httpAxiosClient.post(
      `${this.customerEndpoint}/register`,
      customerData
    );
  }
}

export default new CustomerApi();
