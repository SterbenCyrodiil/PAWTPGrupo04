<h2 align="center">
  PAW | Centro de Análises COVID-19
</h2>

### Componente back-end do Projeto

RESTful API que disponibiliza os endpoints necessários para o acesso e controlo dos dados do projeto, nomeadamente Pedidos de Diagnóstico e Utilizadores.

Existe igualmente um controlo de sessão de utilizadores para acesso aos endpoints desenvolvidos, gerido através de tokens JWT.

- [Node.js](https://nodejs.org/en/) - API framework
- [Express.js](https://expressjs.com/) - definição de rotas para pedidos HTTP
- [Mongoose](https://mongoosejs.com/) - base de dados
- [JWT Authentication](https://jwt.io/) - sessão e autenticação

### SETUP

Deverá ser aberta uma consola do sistema na diretoria principal do projeto e executadas as seguintes linhas.

- Instalar todas as dependências
```
$ npm install
```
- Colocar o servidor em produção
```
$ npm start
```
- Colocar o servidor em modo de desenvolvimento
```
$ npm run dev
```