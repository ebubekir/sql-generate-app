export interface RegisterSchema {
  email: string
  password: string
  full_name: string
}

export interface LoginForm {
  email: string
  password: string
}

export interface LoginResponse {
  access_token: string
  token_type: 'bearer'
  user_id: number
  full_name: string
  email: string
  created_at: string

}

