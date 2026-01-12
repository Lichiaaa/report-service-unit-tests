# Trabalho 7/8 - Arquitetura de Software - report-service-unit-tests

## Testes Unitários
Os testes tem a função de validar as *regras de negócio do domínio* (ReportService), *o comportamento do adapter HTTP* e *a aplicação do Princípio de Inversão de Dependência (DIP)*.

**Testes do domínio**: verificam o tamanho do relatório e se o envio do relatório ocorre corretamente.

**Testes do adapter HTTP**: retorna 400 para erros de validação, 500 para erros genéricos e a tradução correta dos erros do domínio para códigos HTTP.

## Instruções
### Preparação do ambiente
```bash
npm init -y
npm install typescript ts-node --save-dev
npx tsc --init  //não é necessário, ja tem o arquivo de config no repo
npm install -D vitest
```
### Como executar os testes?
Basta rodar esse comando, que ele irá executar todos os testes unitários.
```bash
npm test
```
