# SaaSCom Vue

SaaSCom é um projeto desenvolvido em Vue pela equipe de desenvolvimento da SaaSTec Labs com o objetivo de facilitar o processo do setor comercial para o cadastro de lojas e instituições. 

#Como configurar o projeto

1º Instale a última versão do Node: https://nodejs.org

2º Abra o projeto no seu editor de código-fonte e acesse a aba Terminal

3º Digite: "npm config set registry http://10.40.2.19:8081/repository/saastec-npm-group/"

4º Digite "npm login"

5º Digite: "npm config set always-auth true"

6º Digite: "npm install" para baixar as dependências necessárias


# Dependências

Todas as dependências do projeto estarão presentes no arquivo node_modules. Bem como as dependências internas desenvolvidas pela SaaSTec, sendo elas; Multiline-filter e e Wso2-service, todas sendo diretamente atualizadas de acordo com o arquivo package.json. 

### Multiline-filter

Multiline-filter é um módulo NPM desenvolvido em Vue pela SaaSTec Labs com o objetivo de facilitar e intermediar o processo de acesso e filtro diretamente pelo banco de dados. O módulo é suportado em todos os ambientes de desenvolvimento.

### Wso2-service

Wso2-service é um módulo NPM desenvolvimento em Vue pela SaaSTec Labs com o objetivo de autenticar e validar as requisições feitas pelos projetos client-side desenvolvidos pela SaaSTec, o mesmo realiza a estruturação dos dados e valida o token de acesso para o server-side (aplicacoes-bpm) para todas as requisições do projeto.

 