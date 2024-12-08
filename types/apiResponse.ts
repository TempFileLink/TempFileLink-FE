type ApiResponse<T extends object> = T | ErrorResponse;

type ErrorResponse = {
  success: false;
  message: string;
};

type LoginResponse = {
  token: string;
};

type RegisterResponse = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
  email: string;
};

export type { ApiResponse, LoginResponse, RegisterResponse, ErrorResponse };