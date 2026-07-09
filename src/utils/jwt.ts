import jwt, { JwtPayload } from "jsonwebtoken";

export const generateToken = (payload: JwtPayload, secret: string) => {
    const token = jwt.sign(payload, secret, { expiresIn: "1d" });
    return token;
}