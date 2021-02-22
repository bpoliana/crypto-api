# crypto-api

API para visualização do preço do BitCoin para diferentes moedas: `USD`, `BRL`, `EUR` e `CAD` (Dólar Americano, Real, Euro e Dólar Canadense).
## Tech-stack

Foi escolhida a linguagem _Typescript_, por causa da atual familiaridade da autora com tecnologia e o framework _Express_ em função da sua flexibilidade. Para a requisição feita à API Coin Desk, foi utilizado o `axios`.
Para os testes, foi escolhido o `jest`. 
## Dependências
Para rodar esse projeto localmente, é necessário ter `node.js` instalado. Preferencialmente, a partir da versão `14.x.x` visto a compatibilidade das dependências do projeto. 
Recomenda-se o uso do módulo `nvm` para gerenciar a versão do node logal. 


## Como rodar 
Para instalar as dependências:
```
npm install
```
Para subir a aplicação localmente: 
```
npm start
```

## Testeando 
Para rodar os Testes Unitários use o comando: 
```
npm test
```
## Linter e Husky
Na tentativa de manter padrões sensatos durante a implementação, utlizei o `eslint` como linter para padronização do estilos dos arquivos de texto. E para verificar se o código inserido não quebrava os testes presentes na aplicação, adicionei `husky` com um script que rodava o lint-staged e os testes da aplicação antes de cada commit. 




## Decisões de projeto

### A Arquitetura
A Arquitetura desse projeto pode ser entendida como uma abstração do desenho a seguir:

![architecture](https://github.com/bpoliana/crypto-api/blob/main/architecture.png?raw=true)




