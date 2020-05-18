# Hardware Crawler

Crawler e API para recuperar dados de páginas de lojas de hardaware e armazenar os dados para análise de preço.
Atualmente as lojas em funcionamento são :

- [Pichau](http://pichau.com.br)
- [Terabyteshop](http://terabyteshop.com.br)

## Requisitos para execução

Para executar o projeto, é necessário instalar o [NodeJS](https://nodejs.org/en/download/) e o banco de dados [MySQL](https://www.mysql.com/downloads/).

## Configuração dos arquivos

Após instalação dos requisitos, abra o arquivo `config.js` e informe os dados necessáriios para conexão ao banco, horário de execução dos crawlers e porta da API.

## Execução

Abra o terminal dentro do diretório raiz do projeto e execute o comando `node index.js` para executar a API e o Crawler. (Lembrando que o Crawler irá executar a consulta e salvar os dados no MySQL no horário informado no arquivo `config.js`);