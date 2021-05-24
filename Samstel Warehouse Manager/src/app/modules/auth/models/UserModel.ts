import { AuthModel } from "./AuthModel";
import { UserAddressModel } from "./UserAddressModel";
import { UserCommunicationModel } from "./UserCommunicationModel";
import { UserEmailSettingsModel } from "./UserEmailSettingsModel";
import { UserSocialNetworksModel } from "./UserSocialNetworksModel";

export interface UserModel {
  uid: string;
  username: string;
  email: string;
  companyName?: string;
  phone?: string;
  roles?: Array<number>;
  pic?: string;
  language?: "en" | "de" | "es" | "fr" | "ja" | "zh" | "ru";
  timeZone?: string;
  emailSettings?: UserEmailSettingsModel;
  auth?: AuthModel;
  communication?: UserCommunicationModel;
  address?: UserAddressModel;
}
