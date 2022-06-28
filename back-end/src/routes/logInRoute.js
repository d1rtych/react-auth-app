import jwt from "jsonwebtoken";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";

import { getDbConnection } from "../db";
import { awsUserPool } from "../utils/awsUserPool";

export const logInRoute = {
  path: '/api/login',
  method: 'post',
  handler: async (req, res) => {
    const { email, password } = req.body;

    new CognitoUser({ Username: email, Pool: awsUserPool })
      .authenticateUser(new AuthenticationDetails({ Username: email, Password: password }), {
        onSuccess: async () => {
          const db = getDbConnection('react-auth-db');
          const user = await db.collection('users').findOne({ email });

          const { _id: id, isVerified, info } = user;

          jwt.sign(
            { id, isVerified, email, info },
            process.env.JWT_SECRET,
            { expiresIn: '2d' },
            (err, token) => {
              if (err) return res.sendStatus(500);
              res.status(200).json({ token });
            }
          );
        },
        onFailure: () => {
          res.sendStatus(401);
        }
      });
  }
}