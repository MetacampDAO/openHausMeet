import { PassportStatic } from "passport";
import { Strategy } from "passport-google-oauth20";
import UserDatabase from "../models/userSchema";
import "dotenv/config";

const auth = (passport: PassportStatic) => {
  passport.serializeUser((user, done) => {
    return done(null, user);
  });

  passport.deserializeUser((id, done) => {
    return UserDatabase.findById(id, (_err: any, user: any) => {
      done(null, user);
    });
  });

  passport.use(
    new Strategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        callbackURL: "http://localhost:5000/api/v1/user/google/callback/",
      },
      async (_accessToken, _refreshToken, profile, cb) => {
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name?.givenName,
          lastName: profile.name?.familyName,
          image: profile.photos ? profile.photos[0].value : null,
          email: profile.emails ? profile.emails[0].value : null,
        };

        try {
          let user = await UserDatabase.findOne({ googleId: profile.id });
          if (user) {
            // redirect to dashboard
            cb(null, user, false);
          } else {
            user = await UserDatabase.create(newUser);
            // redirect to settings
            cb(null, user, true);
          }
        } catch (error) {
          console.log("error", error);
        }
      }
    )
  );
};

export default auth;
