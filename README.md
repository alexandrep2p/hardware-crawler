# Hardware Crawler

Crawler e API para recuperar dados de páginas de lojas de hardaware e armazenar os dados para análise de preço.
Atualmente as lojas em funcionamento são :

- [Pichau](http://pichau.com.br)
- [Terabyteshop](http://terabyteshop.com.br)
- [Kabum!](http://kabum.com.br)

## Requisitos para execução

Para executar o projeto, é necessário instalar o [NodeJS](https://nodejs.org/en/download/) e o banco de dados [MySQL](https://www.mysql.com/downloads/).

## Configuração dos arquivos

Após instalação dos requisitos, abra o arquivo `config.js` e informe os dados necessáriios para conexão ao banco, horário de execução dos crawlers e porta da API.

## Execução

Abra o terminal dentro do diretório raiz do projeto e execute o comando `node index.js` para executar a API e o Crawler. (Lembrando que o Crawler irá executar a consulta e salvar os dados no MySQL no horário informado no arquivo `config.js`);

## Endpoints

- `/sellers`
    - GET - Retorna todos os vendedores
- `/products`
    - GET - Retorna todos os produtos, de todos os vendedores
- `/products/seller/:sellerName`
    - GET - Retorna os produtos de determinado vendedor, onde `:sellerName` deve ser informado o nome do vendedor. Ex.: /products/seller/Terabyte
- `/product/name/like/:productName`
    - GET - Retorna os produtos onde o nome contenha a palavra contida em `:productName`. Ex.: /product/name/like/Corsair%20Vengeance
- `/product/productfromseller/:productName/:sellerName`
    - GET - Retorna determinado produto de determinado vendedor, informando em `:productName` e `:sellerName` o nome do produto e vendedor. Ex.: /product/productfromseller/Memória%20DDR4%20Micron,%208GB%202666MHz/Terabyte
- `/product/productfromseller/:productName/:sellerName/:startDate/:endDate`
    - GET - Retorna determinado produto dentro de um intervalo de datas de determinado vendedor, informando em `:productName`, `:sellerName`, `:startDate` e `:endDate` o nome do produto, vendedor, data de início e data final. Ex.: /product/productfromseller/Memória%20DDR4%20Micron,%208GB%202666MHz/Terabyte/2020-05-01/2020-06-01