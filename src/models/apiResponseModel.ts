export interface ApiResponseModel {
  success: boolean;
  message: string;
  data: any;
  error: string | null;
}
