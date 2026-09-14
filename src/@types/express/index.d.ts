import { Request } from "express";

// interface UserObj {
//     id: string
// }

declare global {
  namespace Express {
    interface Request {
      user: any;
      skip?: number;
      offset?: number;
      pagination?: {
        page: number;
        limit: number;
      };
    }
  }
}
