# SPs do sistema

## Utilizadas nas Grids

|SP|Descrição|Utilizada por|Server|Caminho|
|--|--|--|--|--|
|SP_SD940101004|Consulta do cadastro de empresas e filiais|home|`NDW`|saascom\src\views\pages\home\index.vue|
|SP_SD940101005|Essa function é responsável por alterar o código de situação de uma determinada loja|home|`NDW`|saascom\src\views\pages\home\index.vue|

## Utilizadas nos componentes

|SP|Descrição|Utilizada por|Server|Caminho|
|--|--|--|--|--|
|SP_SD940101006|Consulta Login na CE.US01 para verificar se está disponível para cadastro no sistema|FormCasdatroEmpresa e FormCadastroFilial|`NDW`|saascom\src\components\SaastecComponents\FormCadastroEmpresa\index.vue e saascom\src\components\SaastecComponents\FormCadastroFilial\index.vue|
|SP_SD940101003|Consulta CNPJ na CE045 para verificar se está disponível para cadastro no sistema|FormCasdatroEmpresa e FormCadastroFilial|`NDW`|saascom\src\components\SaastecComponents\FormCadastroEmpresa\index.vue e saascom\src\components\SaastecComponents\FormCadastroFilial\index.vue|



# Chamada dos filtros em JSON


### Chamada da SP no pgAdmin:
##### `Exemplo da chamada`
```sql
    SELECT * FROM SP_SD940101003 /*SP*/(
    '1',     /*ENT_NR_VSR*/
    10944,   /*ENT_NR_INST*/
    '36',    /*ENT_CD_SIST*/
    'w12',   /*ENT_NM_LOGIN*/
    '[{"linha":1,"criterio":3,"parametro":"FN001_TP_MOVTO","valor1":"A","valor2":"null","condicao":1},
      {"linha":2,"criterio":3,"parametro":"FN001_TP_TRANS","valor1":"02","valor2":"null","condicao":1},
      {"linha":3,"jsonloja":"LOJA","parametro":"36,19"}
      ]',    /*--FILTROS--*/
    'Todos'   /*ENT_QT_REG*/
);


```

##### Dicionário dos parâmetros da SP:
|Parâmetro   |Nome               |Recebe
|------------|--------------------|------------------------------------------------------------------------|
|ENT_NR_VSR  |Versão              |Versão da Stored Procedure                                              |
|ENT_NR_INST |Insituição          |Número da instituição em que <br> está buscando *Ex: 10944*             |
|ENT_CD_SIST |Aplicação           |Código da aplicação                                                     |
|ENT_NM_LOGIN|Login               |Login do usuário                                                        |
|FILTROS     |Filtros[¹](#filtros)|Recebe todos os filtros que serão feitas as buscas <br> e em quais lojas|
|ENT_QT_REG  |Quantidade          |Número máximo de registros que irá buscar <br> *Ex: 20, 50, 100, 500, TODOS* <br> *Obs: Opção usada para melhorar a performance limitando a quantidade*|


### Chamada da SP no Vue:
##### `Exemplo da chamada`
```javascript
     let response = await this.$wso2.get(
          { functionName: "SD.SP_SD940101006", server: "NDW", versao: "1" },
          10944,
          "94",
          user.base.us01_nm_login,
          objeto,
          null,
          null
        );

/*obj = {quantidade: "1000", filtros: Array(1)*/
```
#### Dicionário dos parâmetros do Vue
|Parâmetro                |Nome               |Recebe                                       |
|-------------------------|-------------------|---------------------------------------------|
|functionName             |Stored Procedure   |SP em que será buscado os registros          |
|server                   |Servidor           |`NDW` = Base de dados e *Produção*, *Homologação* ou *Desenvolvimento* *(dependendo do ambiente onde roda a aplicação)*<br><br> `DW` = Base de dados e Data Warehouse|                                             |
|versao                   |Versão  | Versão da Stored Procedure           |                                             |
|usuario.base.ce040_nr_inst|Insituição         |Número da instituição em que <br> está buscando<br> *Ex: 10944*|
|"36"                     |Aplicação          | Código do sistema com dois dígitos                                           |
|usuario.base.us01_nm_login    |Login              | Login do usuário                                            |
|obj (filtros)                      |Filtros[¹](#filtros)|Recebe todos os filtros que serão feitas as buscas <br> e em quais lojas|
|obj (quantidade)                     |Quantidade         |Número de registros que irá buscar <br> *Ex: 20, 50, 100, 500, TODOS*|




<a id="filtros"></a>
### Dentro do Filtro:
##### `Exemplo:`

```sql
{"linha":2,"criterio":3,"parametro":"FN001_TP_TRANS","valor1":"02","valor2":"null","condicao":1}

{"linha":3,"jsonloja":"LOJA","parametro":"36,19"}

{"linha":3,"jsoncalculo":"CURVAABC","parametro":4}
```
#### Dicionário dos parâmetros do filtro:
|Parâmetro              | Recebe|
|-----------------------|-------|
|linha                  |Ordem em que <br> o Filtro será chamado                                        |
|parametro              |O que será filtrado <br> *Ex: CE001_NM_CLIENT*                                 |
|criterio[³](#criterio) |Número de 1 à 13 <br> indicando a operação<br> de busca                        |
|valor 1  <br> & valor 2|String ou NULL, <br> dependendo da operação <br> do *Critério*[³](#criterio)   |
|condicao[²](#condicao) |Se a operação com o próximo <br> filtro será de 'AND' ou 'OR'                  |
|jsonloja               | Recebe "LOJA" e os parâmetros <br> desse filtro são as lojas a serem filtradas|
|jsoncalculo            | Quando se usa uma mesma SP para diferentes rotinas dentro dessa SP <br> **`Ex:CurvaABC`** <br>`1: Curva ABC de Clientes ` <br>`2: Curva ABC de Estoque` <br>`1: Curva ABC de Produtos` <br>`4: Curva ABC de Fornecedores`|

<a id="condicao"></a>

#### Condições:
| Conteúdo|Significado |
|------|------------|
| **1**|AND |
| **2**|OR  |


<a id="criterio"></a>

#### Dicionário dos Critérios para os parâmetros dos filtros:
|Conteúdo|Operação|Nomes| Valor1 | Valor 2|
|--------|--------|-----|--------|--------|
|**1** |`'ILIKE'`    |<ul><li>Iniciando com </li></ul>                           |String                         | NULL
|**2** |`' ILIKE '`  |<ul><li>Contendo </li></ul>                                |String                         | NULL
|**3** |`' = '`      |<ul><li>Igual a </li> <li>No dia </li></ul>                |String                         | NULL
|**4** |`' < '`      |<ul><li>Menor que</li><li>Antes do dia</li></ul>           |String                         | NULL
|**5** |`' > '`      |<ul><li></li>Maior que<li>Depois do dia</li></ul>          |String                         | NULL
|**6** |`' <= '`     |<ul><li>Menor ou igual a</li></ul>                         |String                         | NULL
|**7** |`' >= '`     |<ul><li>Maior ou igual a</li></ul>                         |String                         | NULL
|**8** |`' <> '`     |<ul><li>Diferente de</li> <li>Diferente do dia</li></ul>   |String                         | NULL
|**9** |`' BETWEEN '`|<ul><li>Entre os dias</li> </ul>                           |String                         | String
|**10**|`' BETWEEN '`|<ul><li>No mês</li> </ul>                                  |String                         | String
|**11**|`' BETWEEN '`|<ul><li>na Semana</li> </ul>                               |String                         | String
|**12**|`' IN ('`    |<ul><li>Igual a</li> <li>No dia</li> <li>Contendo</li></ul>|String <br>**Ex:** `"23,17,19"`| NULL
|**13**|`' NOT IN ('`|<ul><li>Diferente de</li> </ul>                            |String <br>**Ex:** `"23,17,19"`| NULL



