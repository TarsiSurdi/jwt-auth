// This injects the 'userId' property on all Express.js requests
declare namespace Express {
  export interface Request {
    userId: string;
  }
}
