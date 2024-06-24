# TO-DO app

Este é um projeto simples de criação e gerencimaneto de tarefas (to do app).
<br>

## Objetvio

O projeto tem como o objetivo mostrar um pouco da minhas stack de programação. Foi feito com nestjs, criando integradamente documentação automatica via nestjs/swagger.
<br>

## Tecnologias utilizadas

**NestJS** - Utilizado para a criaçao da API.<br>
**NestJS/swagger** - Utilizado para a criação automática do swagger file.<br>
**Scalar** - Front-end estilizado para a documentação (localhost3001/reference).<br>
**Firebase** - Banco de dados utilizado.<br>
**Criptacao** - Algumas bibliotecas para a seguranca como JWT, bcrypt, uuid e outras.<br>
<br>

## Utilizando o app

### Instalação

Necessário primeiramente instalar todas as dependencais

```
npm install
```

e posteriormente iniciar o servidor

```
npm run start
```

após esses passos o servidor estará rodando na porta 3001. Pode ser verificado se está tudo ok acessando **"localhost:3001/reference"**.



### Explorando a API

Para visualizar as rotas acesse a documentação da API no link - **localhost:3001/reference**. 


Posteriormente a isso crie uma conta e logue na mesma para retornar o acess_token.
```
/user/register
/user/login
```

De posse do access_token, utilize-o no resto de todas as rotas como um bearer token
