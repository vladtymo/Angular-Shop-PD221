export interface RegisterModel {
    email: string;
    password: string;
    phone?: string;
    birthdate: Date;
}

export interface LoginModel {
    email: string;
    password: string;
}

export interface LoginResponseModel {
    refreshToken: string;
    accessToken: string;
}

export interface LogoutModel {
    refreshToken: string;
}

export interface IAccessTokenPayload {
    id: string;
    email: string;
    dateOfBirth: Date;
}