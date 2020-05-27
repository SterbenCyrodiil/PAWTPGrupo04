<h2 align="center">
  PAW | Centro de Análises COVID-19
</h2>

<p>
Retirado do enunciado do Projeto:
<blockquote>
Considerando os  tempos atuais,  é necessário  montar um centro de análises regional para a realização de testes despiste e imunização à Covid-19.<br/>
Este centro é coordenado pelo poder político local, administrador da  plataforma, que  contratualizou técnicos laboratoriais para o centro de análises.<br/>
Para  agilizar todo  o processo foi decidido que o centro de análises deve ser suportado por uma aplicação web que permita registar pedidos de diagnóstico ao centro de análises que deverá processar o pedido por um técnico do centro de análises e agendar o teste.
</blockquote>
</p>

## MEAN Stack

- [Mongoose](https://mongoosejs.com/)
- [Express.js](https://expressjs.com/)
- [Angular](https://angular.io/)
- [Node.js](https://nodejs.org/en/)

### SETUP

O Setup específico para cada componente está presente no README dentro da respetiva diretoria, no entanto os comandos seguintes funcionam para os dois componentes.

- Instalar todas as dependências
```
$ npm install
```
- Colocar o servidor em produção
```
$ npm start
```

## REPOSITORY

O repositório divide-se em três branchs principais:

### master
- Contém a documentação geral de todo o projeto (este README e outros ficheiros relevantes) tal como versões funcionais do back-end e front-end, desenvolvidos nos respetivos branchs.

### restBackEnd
- Serve de repositório para todo o desenvolvimento relativo à REST API para o Back-End Server do projeto.

### angularFrontEnd
- Serve de repositório para todo o desenvolvimento relativo a um Front-End Client do projeto, desenvolvido em Angular.

Todos os updates devem ser atualizados para o *master branch*, através de *pull requests* ou *local merges*, dos branchs de desenvolvimento!