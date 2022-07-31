import express from "express";
import passport from "passport";
import fetch from "node-fetch";
import passportOAuth2 from "passport-oauth2";
import User from "./models/user";
import { UserDocument } from "./types";
import pino from 'pino';

const logger = pino();

const OAuth2Strategy = passportOAuth2.Strategy;

const router = express.Router();

const finalize = async (user: UserDocument) => {
  if (process.env.NODE_ENV !== "production" && process.env.DEV_ADMIN) {
    user.admin = process.env.DEV_ADMIN === "true";
    await user.save();
  }
  return user;
};

const makeAuthStrategy = (clientId: string, clientSecret: string) =>
  new OAuth2Strategy(
    {
      authorizationURL: "https://osu.ppy.sh/oauth/authorize",
      tokenURL: "https://osu.ppy.sh/oauth/token",
      clientID: clientId,
      clientSecret: clientSecret,
      callbackURL: "http://localhost:3000/auth/osu/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const me: any = await fetch("https://osu.ppy.sh/api/v2/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      }).then((res) => res.json());

      const existing = await User.findOne({ userid: me.id });
      if (existing) {
        if (existing.username !== me.username) {
          // if user had a namechange, update the db entry
          existing.username = me.username;
          await existing.save();
        }

        return done(null, await finalize(existing));
      }

      const user = new User({
        username: me.username,
        userid: me.id,
        country: me.country_code,
        avatar: me.avatar_url,
        discord: me.discord || "",
      });
      await user.save();
      done(null, await finalize(user));
    }
  );

const getStrategy = (req) => "default";

if (true) {
  passport.use("default", makeAuthStrategy(process.env.SECRET_ID!, process.env.SECRET_CLIENT!));

  passport.serializeUser((user: UserDocument, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });

  router.get("/login", (req, res) => passport.authenticate(getStrategy(req))(req, res));

  router.get("/logout", (req: any, res) => {
    req.logout();
    res.redirect("/");
  });

  router.get(
    "/osu/callback",
    (req, res, next) =>
      passport.authenticate(getStrategy(req), { failureRedirect: "/login" })(req, res, next),
    (req, res) => {
      // Successful authentication!
      res.send("<script>setInterval(window.close)</script>");
    }
  );
}

export default router;