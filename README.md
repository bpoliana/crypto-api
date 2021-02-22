# crypto-api

API para visualização do preço do BitCoin para diferentes moedas: `USD`, `BRL`, `EUR` e `CAD` (Dólar Americano, Real, Euro e Dólar Canadense).
## Tech-stack

Foi escolhida a linguagem _Typescript_, por causa da atual familiaridade da autora com tecnologia e o framework _Express_ em função da sua flexibilidade. Para a requisição feita à API Coin Desk, foi utilizado o `axios`.
Para os testes, foi escolhido o `jest`. Os motivos dessas decisões são detalhados na seção _Decisões de projeto_.

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


### A Arquitetura
A Arquitetura desse projeto pode ser entendida como uma abstração do desenho a seguir:

![architecture](https://github.com/bpoliana/crypto-api/blob/main/architecture.png?raw=true)




## Decisões de projeto 

A escolha pelo _TypeScript_ ocorreu em função do contato mais próximos em projetos que atuei recentemente e o _Express_ foi escolhido pois entendo que sua flexibilidade e simplicidade tornam possível elaborar uma arquitetura conforme a necessidade de cada projeto. 

