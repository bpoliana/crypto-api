export interface IAuthentication {
  authenticate: (value: string) => Promise<string>
}
