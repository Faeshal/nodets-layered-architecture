export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  role: string;
  gender: string;
  job: string;
  address: string;
  age: number;
}

// example, if wanna create separate interface for response
export interface RegisterResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    id: string;
    username: string;
    email: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}
