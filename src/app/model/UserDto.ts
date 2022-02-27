import {Contributors} from "./contributors";

export interface UserDto {

  accessToken: string;
  email: string;
  id: string;
  name: string;
  refreshToken: string;
  role: string[];
  approved: boolean;
  type: string;
}

