import jwt from "jsonwebtoken";
import "dotenv/config";

//! MIDDLEWARE
export const authenticateToken = (req: any, res: any, next: any) => {
  //* CHECK REQ.HEADERS [AUTHORIZATION = HEADER, PAYLOAD, SIGNATURE]
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  //* IF EMPTY TOKEN
  if (token === null) return res.status(401);

  //* TOKEN EXIST
  // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userId) => {
  //   //* WRONG TOKEN
  //   if (err) return res.status(403).json({ error: "No Access" });
  //   //* TOKEN MATCH
  //   req.userId = userId;
  //   next();
  // });
};

//* CAPTCHA
// export const validateHuman = (req, res, next) => {
//     const reCaptchaCheck = async () => {
//         const secret = process.env.RECAPTCHA_SECRET_KEY;
//         console.log(req.body.token);
//         const response = await fetch(
//             `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${req.body.token}`,
//             { method: "POST" }
//         );
//         const data = await response.json();
//         console.log(data, "google data");
//         req.isHuman = data.success;
//         console.log(req.isHuman, "mid");
//         next();
//     };
//     reCaptchaCheck();
// };
