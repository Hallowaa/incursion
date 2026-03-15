export default class LocalStorageManager {
  public saveToken(token: string) {
    localStorage.setItem('accessToken', token)
  }

  public getToken(): string | null {
    return localStorage.getItem('accessToken')
  }
}
