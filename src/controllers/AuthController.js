var ActiveDirectory = require('activedirectory');
var jwt = require('jsonwebtoken');
const { json } = require('express');

var config = { 

    url: 'ldap://ip:port',
    baseDN: 'DC=,DC=,DC=',
    username: 'user@domain.com',
    password: 'pswd'

}

var ad = new ActiveDirectory(config);

module.exports = {

    index(req, res) {

        var domain = '@domain.com'
        var sAMAccountName = req.body.user;
        var userPrincipalName = req.body.user + domain;
        var password = req.body.password;

        ad.authenticate(userPrincipalName, password, function(err, auth) {

            if (err) {

                return res.json({
                    authentication: 'Failed',
                    token: null,
                    err: 'ERROR: ' + err
                });

            }

            if (auth) {

                ad.findUser(sAMAccountName, function(err, user) {

                    if (err) {

                        return res.json({
                            authentication: 'Failed',
                            token: null,
                            err: 'ERROR: ' + err
                        });

                    }

                    if (! user) {

                        return res.json({
                            authentication: 'Failed',
                            token: null,
                            err: 'ERROR: User ' + sAMAccountName + ' not found.'
                        });

                    } 

                    else{

                        const { cn, sAMAccountName, mail } = user;
                        return res.json({
                            cn,
                            sAMAccountName,
                            mail,
                            authentication: 'Success',
                            token: jwt.sign(userPrincipalName, 'PRIVATEKEY'),
                            err: null
                        });

                    }

                });

            }

            else {

                return res.json({
                    authentication: 'Failed',
                    token: null,
                    err: null
                });

            }

        });

    }
    
};
