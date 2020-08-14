import config from "config";
import {getUserById} from "../services/user.service";
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.get('jwtKey')
};

module.exports = passport => {
    passport.use(new JwtStrategy(opts, async (payload, done) => {
        try {
            const user = await getUserById(payload.userId);
            if (user) {
                done(null, user)
            } else {
                done(null, false)
            }
        } catch (e) {
            console.log(e)
        }
    }))
};
