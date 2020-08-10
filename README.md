Funcionamento da Aplicação
===============================
Enviar uma requisição via POST para porta 3890 via JSON
----------------
```
{
    user: "login",
    password: "senha"
}
```

Retorno JSON da aplicação
----------------
```
 {
    cn: "nome usuario",
    sAMAccountName: "login",
    mail: "email usuario",
    authentication: "Success / Failed",
    token: "token de login unico / null",
    err: "msg de erro / null"
}
```

Permissões de acesso via CORS, sendo necessário liberação de acesso via codigo no arquivo server.js
----------------
```
app.use((req, res, next) => {
	// O "*" indicando que qualquer site pode fazer a conexão
        res.header("Access-Control-Allow-Origin", "*");
	...
});
```