const jwt = require('jsonwebtokens');
const SECRET = 'Ni!l1ay/Patel1';

const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.Authorisation;
    if(authHeader){
        const token = authHeader.split(' ')[1];
        jwt.verify(token, SECRET, (err, user) => {
            if(err){
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    }else{
        res.sendStatus(401);
    }
}

module.exports = {authenticateJwt, SECRET};