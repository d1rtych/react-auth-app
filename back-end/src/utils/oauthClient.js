import { google } from "googleapis";

export const oauthClient = new google.auth.OAuth2(
  process.env.GOOGLE_CLIEN_ID,
  process.env.GOOGLE_CLIEN_SECRET,
  'http://localhost:8080/auth/google/callback',
);
