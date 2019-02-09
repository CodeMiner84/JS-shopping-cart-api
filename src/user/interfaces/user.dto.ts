export interface User {
  readonly id: number;
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly created: Date;
}
