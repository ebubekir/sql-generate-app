export interface RegisterSchema {
  email: string
  password: string
  full_name: string
}

export interface LoginResponse {
  access_token: string
  token_type: 'bearer'
}

