import jwt from 'jsonwebtoken';
import { AuthenticationError } from '../models';
import * as ConfigContainer from '../config.cjs';

export function verifyToken(token) {
    try {
        return jwt.verify(token, ConfigContainer.config.auth.secret);
    } catch (err) {
        throw new AuthenticationError('TOKEN_INVALID');
    }
}

export function generateToken(payload) {
    return jwt.sign(payload, ConfigContainer.config.auth.secret);
}
