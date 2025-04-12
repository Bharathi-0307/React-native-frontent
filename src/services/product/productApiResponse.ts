import httpAxiosClient from '../../config/httpclient';
import { ApiResponseModel } from '../../models/apiResponseModel';
import { Product } from '../../models/Product';
import { handleApiError } from '../../utils/handleError';

class ProductService {
  static async getProducts(): Promise<ApiResponseModel> {
    try {
      const response = await httpAxiosClient.get('/products');
      return {
        success: true,
        message: 'Products fetched successfully',
        data: response.data,
        error: null
      };
    } catch (error: any) {
      return {
        success: false,
        message: 'Failed to fetch products',
        data: null,
        error: handleApiError(error)
      };
    }
  }

  static async deleteProduct(productId: string): Promise<ApiResponseModel> {
    try {
      const response = await httpAxiosClient.delete(`/products/${productId}`);
      return {
        success: true,
        message: 'Product deleted successfully',
        data: response.data,
        error: null
      };
    } catch (error: any) {
      return {
        success: false,
        message: 'Failed to delete product',
        data: null,
        error: handleApiError(error)
      };
    }
  }

  static async createProduct(productData: Product): Promise<ApiResponseModel> {
    try {
      const response = await httpAxiosClient.post('/products', productData);
      return {
        success: true,
        message: 'Product created successfully',
        data: response.data,
        error: null
      };
    } catch (error: any) {
      return {
        success: false,
        message: 'Failed to create product',
        data: null,
        error: handleApiError(error)
      };
    }
  }

  static async updateProduct(
    productId: string, 
    productData: Partial<Product>
  ): Promise<ApiResponseModel> {
    try {
      const response = await httpAxiosClient.put(`/products/${productId}`, productData);
      return {
        success: true,
        message: 'Product updated successfully',
        data: response.data,
        error: null
      };
    } catch (error: any) {
      return {
        success: false,
        message: 'Failed to update product',
        data: null,
        error: handleApiError(error)
      };
    }
  }
}

export default ProductService;