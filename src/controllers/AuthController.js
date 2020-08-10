var ActiveDirectory = require('activedirectory');
var jwt = require('jsonwebtoken');
const { json } = require('express');

var config = { 

    url: 'ldap://192.168.128.15:389',
    baseDN: 'DC=aliancaenergia,DC=com,DC=br',
    username: 'api@aliancaenergia.com.br',
    password: 'vtTut1fM6L#'

}

var ad = new ActiveDirectory(config);

module.exports = {

    index(req, res) {

        var domain = '@aliancaenergia.com.br'
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