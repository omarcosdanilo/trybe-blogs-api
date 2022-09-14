# Seja bem vindo ao repositório do projeto Blogs API!

<details>
  <summary><strong>❓ O que é o Blogs API?</strong></summary>

  No Blogs API foi desenvolvido uma API e um banco de dados para a produção de conteúdo para um blog. Foi utilizada a arquitetura MSC (Model, Service, Controller) 

<br />
</details>

<details>
  <summary><strong>🖥️ Tecnologias utilizadas</strong></summary>

 * JavaScript
 * NodeJS
 * Express
 * MySQL
 * Sequelize
 * Docker
 * JWT

<br />
</details>

<details>
  <summary><strong>Informações importantes </strong></summary>
</details>

<details>
  <summary><strong>🐋 Como executar o projeto</strong></summary>
  
  
  **:warning: Antes de começar, seu docker-compose precisa estar na versão 1.29 ou superior. [Veja aqui](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-pt) ou [na documentação](https://docs.docker.com/compose/install/) como instalá-lo. No primeiro artigo, você pode substituir onde está com `1.26.0` por `1.29.2`.**

> :information_source: Rode os serviços `node` e `db` com o comando `docker-compose up -d --build`.

- Caso tenha algum serviço `mysql` rodando localmente na porta padrão (`3306`), lembre-se de pará-lo ou adapte, caso queria fazer uso da aplicação em containers;

 - Esses serviços irão inicializar um container chamado `blogs_api` e outro chamado `blogs_api_db`;
 
 - A partir daqui você pode rodar o container `blogs_api` via CLI ou abri-lo no VS Code;
 
  > :information_source: Use o comando `docker exec -it blogs_api bash`.
  
  - Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.
  
  > :information_source: Instale as dependências com `npm install`. (Instale dentro do container)
  <br/>
</details>
