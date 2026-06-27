export interface AuthProfile {
  id: string;
  name: string;
  phoneNumber?: string;
  email?: string;
  type: string;
  isActive: boolean;
  gender?: string;
  roles?: Array<{ id: string; name: string; key: string }>;
  currentRole?: { id: string; name: string; key: string };
  permissions?: string[];
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  profile: AuthProfile;
}
