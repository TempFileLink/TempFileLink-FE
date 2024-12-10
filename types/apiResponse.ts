type ApiResponse<T extends object> = T | ErrorResponse;

type ErrorResponse = {
  success: false;
  message: string;
};

type RegisterResponse = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
  email: string;
};

type UploadResponse = {
  expiryTime: string;
  fileId: string;
  message: string;
};

export type { ApiResponse, RegisterResponse, ErrorResponse, UploadResponse };
