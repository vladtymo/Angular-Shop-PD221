import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { IAccessTokenPayload } from '../account/account';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  accessKey = "access-token-key";
  refreshKey = "refresh-token-key";

  constructor() { }

  saveToken(accessToken: string, refreshToken: string): void {
    localStorage.setItem(this.accessKey, accessToken);
    localStorage.setItem(this.refreshKey, refreshToken);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessKey);
  }
  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshKey);
  }

  refreshToken() {
    // TODO
  }

  clear() {
    localStorage.removeItem(this.accessKey);
    localStorage.removeItem(this.refreshKey);
  }

  getAccessTokenPayload(): IAccessTokenPayload | null {

    const token = this.getAccessToken();

    if (!token) return null;

    try {
      const payload: any = jwtDecode(token);

      return {
        email: payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name' as keyof IAccessTokenPayload],
        id: payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier' as keyof IAccessTokenPayload],
        dateOfBirth: payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/dateofbirth' as keyof IAccessTokenPayload]
      };

    } catch (Error) {
      return null;
    }
  }
}
