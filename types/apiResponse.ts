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

type InfoFileResponse = {
  filename: string;
  fileId: string;
  isPassword: boolean;
  contentSize: number;
};

type ListFilesResponse = {
  data: { fileId: string; name: string }[];
};

export type {
  ApiResponse,
  RegisterResponse,
  ErrorResponse,
  InfoFileResponse,
  ListFilesResponse,
};
