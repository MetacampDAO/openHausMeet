import { Request, Response, NextFunction } from "express";

const isLoggin = (req: Request, res: Response, next: NextFunction) => {
  req.isAuthenticated() ? next() : res.redirect("/");
};

// const isGuest = (req: Request, res: Response, next: NextFunction) => {
//   req.isAuthenticated() ? res.redirect("/dashboard") : next();
// };

export { isLoggin };
