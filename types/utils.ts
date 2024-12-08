import type { ApiResponse, ErrorResponse } from './apiResponse';

export function isErrorResponse<T extends object>(
  response: ApiResponse<T>,
): response is ErrorResponse {
  return (
    response !== null && 'success' in response && response.success === false
  );
}
