# Seja bem vindo ao repositório do projeto Blogs API!

---
 ### 👉 Endpoint para fazer as requisições: blogsapi.mddev.ml
---
 
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
  <summary  id="diagrama"><strong>🎲 Diagrama ER e Entidades</strong></summary>
  
  #### Diagrama de Entidade-Relacionamento

  ![DER](./public/der.png)
  
</details>

  <summary><strong>Endpoints</strong></summary>
  
---

## 1 - Endpoint POST `/user`

- O endpoint é acessível através do URL `/user`;
- O endpoint é capaz de adicionar um novo `user` na tabela Users no banco de dados;
- O corpo da requisição deverá seguir o formato abaixo:
  ```json
  {
    "displayName": "Nome Qualquer",
    "email": "nomequalquer@email.com",
    "password": "123456",
    "image": "http://urlDaImagem.png"
  }
  ```

<details>
  <summary><strong>Os seguintes pontos são validados</strong></summary>

  * **[Não é possível cadastrar um usuário com o campo `displayName` menor que 8 caracteres]**
    - Se a requisição não tiver o campo `displayName` devidamente preenchido com 8 caracteres ou mais, o resultado retornado será conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "\"displayName\" length must be at least 8 characters long"
    }
    ```
  
  * **[Não é possível cadastrar com o campo `email` com formato inválido]**
    - Se a requisição não tiver o campo `email` devidamente preenchido com o formato `<prefixo@dominio>`, o resultado retornado será conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "\"email\" must be a valid email"
    }
    ```

  * **[Não é possível cadastrar com o campo `password` menor que 6 caracteres]**
    - Se a requisição não tiver o campo `password` devidamente preenchido com 6 caracteres ou mais, o resultado retornado será conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "\"password\" length must be at least 6 characters long"
    }
    ```

  * **[Não é possível cadastrar com um email já existente]**
    - Se a requisição enviar o campo `email` com um email que já existe, o resultado retornado será conforme exibido abaixo, com um status http `409`:
    ```json
    {
      "message": "User already registered"
    }
    ```
  
  * **[É possível cadastrar um pessoa usuária]**
    - Se o user for criado com sucesso o resultado retornado será conforme exibido abaixo, com um status http `201`:
    ```json
      {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
      }
      ```
    > :warning: O token anterior é fictício, o token é gerado a partir da variável de ambiente `JWT_SECRET`, do `payload` da requisição e contém o atributo `password` em sua construção.

<br />
</details>

## 2 - Endpoint POST `/login`

- O endpoint é acessível através do URL `/login`;
- O corpo da requisição deverá seguir o formato abaixo:
  ```json
  {
    "email": "seuemail@gmail.com",
    "password": "123456"
  }
  ```

<details>
  <summary><strong>As seguintes validações são feitas:</strong></summary>

  * **[Não é possível fazer login sem todos os campos preenchidos]**
    - Se a requisição não tiver todos os campos devidamente preenchidos(não pode haver campos em branco), o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "Some required fields are missing"
    }
    ```

  * **[Não é possível fazer login com um usuário que não existe]**
    - Se a requisição receber um par de `email` e `password` errados/inexistentes, o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "Invalid fields"
    }
    ```
  
  * **[É possível fazer login]**
    - Se o login foi feito com sucesso o resultado retornado será conforme exibido abaixo, com um status http `200`:
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
    }
    ```
    > :warning: O token anterior é fictício, o token é gerado a partir da variável de ambiente `JWT_SECRET`, do `payload` da requisição e não contém o atributo `password` em sua construção.

<br />
</details>

---

## 3 - Endpoint GET `/user`

- ☝ Neste endpoint é feita a validação de existência de um token válido no campo authorization do header da requisição.
- O endpoint é acessível através do URL `/user`;
- O endpoint traz todos `users` do banco de dados;

<details>
  <summary><strong>Os seguintes pontos são validados</strong></summary>

  * ☝ **[É validada a existência de um token no campo authorization do header da requisição]**

  * **[É possível listar todos os usuários]**
    - Ao listar usuários com sucesso o resultado retornado será conforme exibido abaixo, com um status http `200`:
    ```json
    [
      {
          "id": 1,
          "displayName": "Nome Qualquer",
          "email": "emailqualquer@gmail.com",
          "image": "https://urldaimagem.jpg"
      },

      /* ... */
    ]
    ```

<br />
</details>

---

## 4 - Endpoint GET `/user/:id`

- ☝ Neste endpoint é feita a validação de existência de um token válido no campo authorization do header da requisição;
- O endpoint é acessível através do URL `/user/:id`;
- O endpoint é capaz de trazer o `user` baseado no `id` do banco de dados se ele existir;

<details>
  <summary><strong>Os seguintes pontos são validados</strong></summary>

  * ☝ **[É validada a existência de um token no campo authorization do header da requisição]**

  * **[É possível listar um usuário específico]**
    - Ao listar um usuário com sucesso o resultado retornado será conforme exibido abaixo, com um status http `200`:
    ```json
    {
      "id": 1,
      "displayName": "Nome Qualquer",
      "email": "emailqualquer@gmail.com",
      "image": "https://urldaimagem.jpg"
    }
    ```

  * **[Não é possível listar um usuário inexistente]**
    - Se o usuário for inexistente o resultado retornado será conforme exibido abaixo, com um status http `404`:
    ```json
    {
      "message": "User does not exist"
    }
    ```

<br />
</details>

## 5 - Endpoint POST `/categories`

- ☝ Neste endpoint é feita a validação de existência de um token válido no campo authorization do header da requisição;
- O endpoint é acessível através do URL `/categories`;
- O endpoint é capaz de adicionar uma nova categoria na tabela categories no banco de dados;
- O corpo da requisição deverá seguir o formato abaixo:
  ```json
  {
    "name": "Typescript"
  }
  ```

<details>
  <summary><strong>Os seguintes pontos são validados</strong></summary>

  * ☝ **[É validada a existência de um token no campo authorization do header da requisição]**

  * **[Não é possível cadastrar uma categoria sem o campo `name`]**
    - Se a requisição não tiver o campo `name` devidamente preenchidos(não pode haver campo em branco), o resultado retornado será conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "\"name\" is required"
    }
    ```

  * **[É possível cadastrar uma categoria]**
    - Se a categoria for criada com sucesso o resultado retornado será conforme exibido abaixo, com um status http `201`:
    ```json
    {
      "id": 3,
      "name": "Typescript"
    }
    ```

<br />
</details>

---

## 6 - Endpoint GET `/categories`

- ☝ Neste endpoint é feita a validação de existência de um token válido no campo authorization do header da requisição;
- O endpoint é acessível através do URL `/categories`;
- O endpoint deve é capaz de trazer todas categorias do banco de dados;

<details>
  <summary><strong>Os seguintes pontos são validados</strong></summary>

  * ☝ **[É validada a existência de um token no campo authorization do header da requisição]**

  * **[É possível listar todas as categorias]**
    - Ao listar categorias com sucesso o resultado retornado será conforme exibido abaixo, com um status http `200`:
    ```json
    [
      {
          "id": 1,
          "name": "Inovação"
      },
      {
          "id": 2,
          "name": "Escola"
      },

      /* ... */
    ]
    ```

<br />
</details>

## 7 - Endpoint POST `/post`

- ☝ Neste endpoint é feita a validação de existência de um token válido no campo authorization do header da requisição;
- O endpoint deve é através do URL `/post`;
- O endpoint é capaz de adicionar um novo blog post na tabela BlogPosts e vinculá-lo as categorias na tabela PostCategories no banco de dados;
- O corpo da requisição deverá seguir o formato abaixo:
  ```json
  {
    "title": "Um tiítulo qualquer",
    "content": "Um texto qualquer",
    "categoryIds": [1, 2]
  }
  ```
<details>
  <summary><strong>Os seguintes pontos são validados</strong></summary>

  * ☝ **[É validada a existência de um token no campo authorization do header da requisição]**

  * **[Não é possível cadastrar sem todos os campos preenchidos]**
    - Se a requisição não tiver todos os campos devidamente preenchidos(não pode haver campos em branco), o resultado retornado será conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "Some required fields are missing"
    }
    ```

  * **[Não é possível cadastrar um blogpost com uma `categoryIds` inexistente]**
    - Se a requisição não tiver o campo `categoryIds` devidamente preenchido com um array com pelo menos uma categoria que exista, o resultado retornado será conforme exibido abaixo, com um status http `400``:
    ```json
    {
      "message": "\"categoryIds\" not found"
    }
    ```

  * **[É possível cadastrar um blogpost]**
  - Se o blog post for criado com sucesso o resultado retornado será conforme exibido abaixo, com um status http `201`:
  ```json
  {
    "id": 3,
    "title": "Um título qualquer",
    "content": "Um texto qualquer",
    "userId": 1,
    "updated": "2022-05-18T18:00:01.196Z",
    "published": "2022-05-18T18:00:01.196Z"
  }
  ```

<br />
</details>

---

## 8 - Endpoint GET `/post`

- ☝ Neste endpoint é feita a validação de existência de um token válido no campo authorization do header da requisição;
- O endpoint deve é através do URL `/post`;
- O endpoint é capaz de trazer todos os bogs post, user dono dele e as categorias do banco de dados;

<details>
  <summary><strong>Os seguintes pontos são validados</strong></summary>

  * ☝ **[É validada a existência de um token no campo authorization do header da requisição]**

  * **[É possível listar blogposts]**
    - Ao listar posts com sucesso o resultado retornado será conforme exibido abaixo, com um status http `200`:
    ```json
    [
      {
        "id": 1,
        "title": "Post do Ano",
        "content": "Melhor post do ano",
        "userId": 1,
        "published": "2011-08-01T19:58:00.000Z",
        "updated": "2011-08-01T19:58:51.000Z",
        "user": {
          "id": 1,
          "displayName": "Nome qualquer",
          "email": "emailqualquer@gmail.com",
          "image": "https://urldaimagem.jpg"
        },
        "categories": [
          {
            "id": 1,
            "name": "Inovação"
          }
        ]
      },
      
      /* ... */
    ]
    ```

<br />
</details>

---

## 9 - Endpoint GET `/post/:id`

- ☝ Neste endpoint é feita a validação de existência de um token válido no campo authorization do header da requisição;
- O endpoint é acessível através do URL `/post/:id`;
- O endpoint é capaz de trazer o blog post baseado no `id` do banco de dados se ele existir;

<details>
  <summary><strong>Os seguintes pontos são validados</strong></summary>

  * ☝ **[É validada a existência de um token no campo authorization do header da requisição]**

  * **[É possível listar um blogpost com sucesso]**
    - Ao listar um post com sucesso o resultado retornado será conforme exibido abaixo, com um status http `200`:
    ```json
    {
      "id": 1,
      "title": "Post do Ano",
      "content": "Melhor post do ano",
      "userId": 1,
      "published": "2011-08-01T19:58:00.000Z",
      "updated": "2011-08-01T19:58:51.000Z",
      "user": {
          "id": 1,
          "displayName": "Nome qualquer",
          "email": "emailqualquer@gmail.com",
          "image": "https://urldaimagem.jpg"
      },
      "categories": [
          {
              "id": 1,
              "name": "Inovação"
          }
      ]
    }
    ```

  * **[Não é possível listar um blogpost inexistente]**
    - Se o post for inexistente o resultado retornado será conforme exibido abaixo, com um status http `404`:
    ```json
    {
      "message": "Post does not exist"
    }
    ```

<br />
</details>

---

## 10 - Endpoint PUT `/post/:id`

- ☝ Neste endpoint é feita a validação de existência de um token válido no campo authorization do header da requisição;
- O endpoint é acessível através do URL `/post/:id`;
- O endpoint é capaz de alterar um post do banco de dados, se ele existir;
- A aplicação só permite a alteração de um blog post caso a pessoa seja dona dele;
- A aplicação não permite a alteração das categorias do post, somente os atributos `title` e `content` podem ser alterados;
- O corpo da requisição deverá seguir o formato abaixo:
  ```json
  {
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key"
  }
  ```
  

<details>
  <summary><strong>Os seguintes pontos são validados</strong></summary>

  * ☝ **[É validada a existência de um token no campo authorization do header da requisição]**

  * **[Não é possível editar um blogpost com outro usuário]**
    - Somente o user que criou o blog post poderá editá-lo, o resultado retornado será conforme exibido abaixo, com um status http `401`
    ```json
      {
        "message": "Unauthorized user"
      }
    ```

  * **[Não é possível editar sem todos os campos preenchidos]**
    - Se a requisição não tiver todos os campos devidamente preenchidos(não pode haver campos em branco), o resultado retornado será conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "Some required fields are missing"
    }
    ```

  * **[É possível editar um blogpost]**
    - Se o blog post for alterado com sucesso o resultado retornado será conforme exibido abaixo, com um status http `200`:
    ```json
    {
      "id": 3,
      "title": "Latest updates, August 1st",
      "content": "The whole text for the blog post goes here in this key",
      "userId": 1,
      "published": "2022-05-18T18:00:01.000Z",
      "updated": "2022-05-18T18:07:32.000Z",
      "user": {
        "id": 1,
        "displayName": "Lewis Hamilton",
        "email": "lewishamilton@gmail.com",
        "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
      },
      "categories": [
        {
          "id": 1,
          "name": "Inovação"
        },
        {
          "id": 2,
          "name": "Escola"
        }
      ]
    }
    ```

<br />
</details>

---

## 11 - Endpoint DELETE `/post/:id`

- ☝ Neste endpoint é feita a validação de existência de um token válido no campo authorization do header da requisição;
- O endpoint é acessível através do URL `/post/:id`;
- O endpoint é capaz de deletar um blog post baseado no `id` do banco de dados se ele existir;
- A aplicação só permite a deleção de um blog post caso a pessoa seja dona dele;

<details>
  <summary><strong>Os seguintes pontos são validados</strong></summary>

  * ☝ **[É validada a existência de um token no campo authorization do header da requisição]**

  * **[Não é possível deletar um blogpost com outro usuário]**
    - Somente o user que criou o blog post poderá deletá-lo, o resultado retornado será conforme exibido abaixo, com um status http `401`
    ```json
      {
        "message": "Unauthorized user"
      }
    ```

  * **[É possível deletar um blogpost]**
    - Se o blog post for deletado com sucesso não é retornada nenhuma resposta, apenas um status http `204`:

  * **[Não é possível deletar um blogpost inexistente]**
    - Se o post for inexistente o resultado retornado será conforme exibido abaixo, com um status http `404`:
    ```json
    {
      "message": "Post does not exist"
    }
    ```

<br />
</details>

---

## 12 - Endpoint DELETE `/user/me`

- ☝ Neste endpoint é feita a validação de existência de um token válido no campo authorization do header da requisição;
- O endpoint é acessível através do URL `/user/me`;
- O endpoint é capaz de deletar você do banco de dados, baseado no `id` que esta dentro do seu `token`;
- A aplicação é capaz de utilizar o token de autenticação nos headers, para saber o user logado correspondente á ser apagado;

<details>
  <summary><strong>Os seguintes pontos são validados</strong></summary>

  * ☝ **[É validada a existência de um token no campo authorization do header da requisição]**

  * **[É possível excluir meu usuário com sucesso]**
    - Se o user for deletado com sucesso não será retornada nenhuma resposta, apenas um status http `204`:

<br />
</details>

---

## 13 - Endpoint GET `/post/search?q=:searchTerm`

- ☝ Neste endpoint é feita a validação de existência de um token válido no campo authorization do header da requisição;
- O endpoint é acessível através do URL `/post/search`;
- O endpoint é capaz de trazer os blogs post baseados no `q` do banco de dados, se ele existir;
- A aplicação é capaz de retornar um array de blogs post que contenham em seu título ou conteúdo o termo passado na URL;
- A aplicação é capaz de retornar um array vázio caso nenhum blog post satisfaça a busca;
- O query params da requisição deverá seguir o formato abaixo:
  ```js
    http://localhost:PORT/post/search?q=vamos
  ```

<details>
  <summary><strong>Os seguintes pontos são validados</strong></summary>

  * ☝ **[É validada a existência de um token no campo authorization do header da requisição]**

  * **[É possível buscar um blogpost pelo `title`]**
    - Se a buscar for pelo `title` o resultado retornado será conforme exibido abaixo, com um status http `200`:
    ```json
    // GET /post/search?q=Vamos que vamos

    [
      {
        "id": 2,
        "title": "Vamos que vamos",
        "content": "Foguete não tem ré",
        "userId": 1,
        "published": "2011-08-01T19:58:00.000Z",
        "updated": "2011-08-01T19:58:51.000Z",
        "user": {
          "id": 1,
          "displayName": "Lewis Hamilton",
          "email": "lewishamilton@gmail.com",
          "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
        },
        "categories": [
          {
            "id": 2,
            "name": "Escola"
          }
        ]
      }
    ]
    ```

  * **[É possível buscar um blogpost pelo `content`]**
    - Se a buscar for pelo `content` o resultado retornado será conforme exibido abaixo, com um status http `200`:
    ```json
      // GET /post/search?q=Foguete não tem ré

      [
        {
          "id": 2,
          "title": "Vamos que vamos",
          "content": "Foguete não tem ré",
          "userId": 1,
          "published": "2011-08-01T19:58:00.000Z",
          "updated": "2011-08-01T19:58:51.000Z",
          "user": {
            "id": 1,
            "displayName": "Lewis Hamilton",
            "email": "lewishamilton@gmail.com",
            "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
          },
          "categories": [
            {
              "id": 2,
              "name": "Escola"
            }
          ]
        }
      ]
    ```

  * **[É possível buscar todos os blogpost quando passa a busca vazia]**
    - Se a buscar for vazia o resultado retornado será conforme exibido abaixo, com um status http `200`:
    ```json
      // GET /post/search?q=

      [
        {
          "id": 1,
          "title": "Post do Ano",
          "content": "Melhor post do ano",
          "userId": 1,
          "published": "2011-08-01T19:58:00.000Z",
          "updated": "2011-08-01T19:58:51.000Z",
          "user": {
            "id": 1,
            "displayName": "Lewis Hamilton",
            "email": "lewishamilton@gmail.com",
            "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
          },
          "categories": [
            {
              "id": 1,
              "name": "Inovação"
            }
          ]
        },
        
        /* ... */
      ]
    ```

  * **[É possível buscar um blogpost inexistente e retornar array vazio]**
    - Se a buscar um post inexistente o resultado retornado será conforme exibido abaixo, com um status http `200`:
    ```json
      // GET /post/search?q=BATATA

      []
    ```

</details>
  
  
</details>
