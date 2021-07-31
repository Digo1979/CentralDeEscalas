<!--
  Copyright © 2021 Informatize. Todos os direitos reservados
-->
<template>
  <div class="mx-2 px-2">
    <v-row
      justify="end">
      <v-dialog
        :hide-overlay="isMobileWidth"
        :fullscreen="isMobileWidth"
        transition="dialog-bottom-transition"
        max-width="1400"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            class="mr-2 mb-5"
            color="primary light-blue accent-3"
            v-on="on"
          >Cadastrar empresa</v-btn
          >
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-card-title
              color="primary"
              dark>
              <v-row
                class="p-3 pb-0"
                justify="space-between">
                <div>Cadastro de Empresa</div>
                <v-btn
                  color="light-blue accent-3"
                  text
                  @click="dialog.value = false"
                >Fechar</v-btn
                >
              </v-row>
            </v-card-title>
            <FormCadastroEmpresa @cadastroConcluido="handleOk" />
          </v-card>
        </template>
      </v-dialog>
    </v-row>
    <div>
      <multiline-filter
        :opcoes-tipo="opcoes"
        :qt-maxima="20"
        :lista-traducao="$t('MULTIFILTER')"
        :analitico-sintetico="false"
        @nok="alertarErro"
        @ok="consultarServico"
      />
    </div>

    <v-card
      rounded="lg">
      <v-data-table
        v-if="exibeConsulta"
        :headers="columns"
        :items="resultadoPesquisa"
        :items-per-page="15"
        max-height="400"
        class="my-5"
      >
        <template v-slot:[`item.sd001_nr_inst`]="{ item }">
          <v-btn
            color="light-blue accent-3"
            text
            @click="exibirDetalhesLoja(item)"
          >{{ `${String(item.sd001_nr_inst).replace(/(\d{4})(\d{1})/g,"$1-$2")}` }}</v-btn
          >
        </template>

        <template v-slot:[`item.cd_filial`]="{ item }">
          <v-btn
            color="light-blue accent-3"
            text
            @click="exibirDetalhesLoja(item)"
          >{{ `${(function(nr_filial){
            if(nr_filial.length > 1) return nr_filial.substring(0,nr_filial.length-1) + "-" + nr_filial.slice(-1)
            return nr_filial
          })(String(item.sd001_nr_filial))}` }}</v-btn
          >
        </template>

        <template v-slot:[`item.sd001_nr_filial`]="{ item }">
          <v-btn
            :disabled="item.sd001_nr_filial == 27"
            small
            text
            color="light-blue accent-3"
            @click="
              exibirModalCadastroLoja(
                item.sd001_nr_inst,
                item.ce045_nm_razao
              )
            "
          >
            Adicionar filial
          </v-btn>
        </template>
        <template v-slot:[`item.ce045_cd_situac`]="{ item }">
          <v-menu
            :disabled="!isRepresentante"
            offset-y>
            <template v-slot:activator="{ on, attrs }">
              <div style="width: 125px">
                <v-btn
                  v-bind="attrs"
                  :color="corSituacao(item.ce045_cd_situac)"
                  text
                  dark
                  block
                  dense
                  small
                  v-on="on"
                >
                  {{
                    itensSelecionaveis.situacao.filter(
                      (obj) => obj.value == item.ce045_cd_situac
                    )[0].text
                  }}
                  <v-spacer v-if="isRepresentante" />
                  <v-icon
                    dark
                    right>
                    {{ isRepresentante ? "expand_more" : "" }}
                  </v-icon>
                </v-btn>
              </div>
            </template>
            <v-list>
              <v-list-item
                v-for="(itemLista, index) in itensSelecionaveis.situacao"
                :key="index"
                @click="
                  alterarSituacao(itemLista.value, item.ce045_nr_cnpj)
                "
              >
                <v-list-item-title>{{
                  itemLista && itemLista.text
                }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
        <template v-slot:[`item.sd001_dt_contr`]="{ item }">
          <span>{{ moment(item.sd001_dt_contr).format("DD/MM/YYYY") }}</span>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog
      :hide-overlay="isMobileWidth"
      :fullscreen="isMobileWidth"
      v-model="visibleVisualizarLoja"
      transition="dialog-bottom-transition"
      max-width="60%"
    >
      <template v-slot:default="dialog">
        <v-card>
          <v-container
            class="mx-0"
            fluid>
            <v-row>
              <v-btn
                color="blue darken-1"
                text
                style="position: absolute; z-index:99; right:0"
                @click="dialog.value = false">
                Fechar
              </v-btn>
              <v-col
                cols="1"
                md="2"
                class="d-none d-md-block pa-0"
                style="background-color: #727376"
                align="center"
                justify="center"

              >
                <v-container
                  fluid
                  class="pa-0"
                  fill-height>
                  <v-img
                    contain
                    src="../../../../public/resources/images/profile_saascom_banner.png"/>
                </v-container>
              </v-col>
              <DetalhesLoja
                :empresa="dadosDaLoja"
                :show-endereco="showEndereco"
                :is-representante="isRepresentante"
                @cadastroConcluido="handleOk"
                @adicionarFilial="
                  exibirModalCadastroLoja(
                    dadosDaLoja.sd001_nr_inst,
                    dadosDaLoja.ce045_nm_fantas
                )"
                @mudarSituacao="alterarSituacao($event, dadosDaLoja.ce045_nr_cnpj)"/>
            </v-row>
          </v-container>
        </v-card>
      </template>
    </v-dialog>

    <v-dialog
      :hide-overlay="isMobileWidth"
      :fullscreen="isMobileWidth"
      v-model="visibleModalCadastroLoja"
      transition="dialog-bottom-transition"
      max-width="1400"
    >
      <template v-slot:default="dialog">
        <v-card>
          <v-card-title
            color="primary light-blue accent-3"
            dark>
            <v-row
              class="p-3 pb-0"
              justify="space-between">
              <div>Inserir nova filial</div>
              <v-btn
                color="primary light-blue accent-3"
                text
                @click="dialog.value = false"
              >Fechar</v-btn
              >
            </v-row>
          </v-card-title>
          <FormCadastroFilial
            :instituicao="lojaInstituicao"
            :razao="nomeRazao"
            @cadastroConcluido="handleOk"
          />
        </v-card>
      </template>
    </v-dialog>

    <!-- Div fantasma para geracao de código de barras -->
    <div class="d-none">
      <img id="barras-cnpj">
    </div>

  </div>
</template>

<script>
import MultilineFilter from "@saastec/saastec-multiline-filter";
import moment from "moment";
import FormCadastroEmpresa from "@/components/SaastecComponents/FormCadastroEmpresa";
import DetalhesLoja from "@/components/SaastecComponents/DetalhesLoja";
import FormCadastroFilial from "@/components/SaastecComponents/FormCadastroFilial";
import { itensSelecionaveis } from "../../../components/Util/Formularios/itensSelecionaveis";
import "moment/locale/pt-br";
import Swal from "sweetalert2";

const columns = [
  {
    text: "Empresa",
    value: "sd001_nr_inst",
    class: "yellow darken-1 white--text text-body-1 rounded-tl-lg",
    width: 120,

  },
  {
    text: "Filial",
    value: "cd_filial",
    class: "yellow darken-1 white--text text-body-1",
    width: 50,

  },
  {
    text: "Representante",
    class: "yellow darken-1 white--text text-body-1",
    value: "us01_nm_usr",
    width: 160,
  },
  {
    text: "CNPJ",
    class: "yellow darken-1 white--text text-body-1",
    value: "ce045_nr_cnpj",
    width: 160,
  },
  {
    text: "Razão social",
    class: "yellow darken-1 white--text text-body-1",
    value: "ce045_nm_razao",
    width: 250,
  },
  {
    text: "Nome fantasia",
    value: "ce045_nm_fantas",
    class: "yellow darken-1 white--text text-body-1",
    width: 250,
  },
  {
    text: "Cidade",
    class: "yellow darken-1 white--text text-body-1",
    value: "ce045_nm_cidade",
    width: 180,
  },
  {
    text: "UF",
    class: "yellow darken-1 white--text text-body-1",
    value: "ce045_sg_estado",
    width: 75,
  },
  {
    text: "Data",
    class: "yellow darken-1 white--text text-body-1",
    value: "sd001_dt_contr",
    width: 85,
  },
  {
    text: "Situação",
    class: "yellow darken-1 white--text text-body-1",
    value: "ce045_cd_situac",
    width: 120,
  },
  {
    text: "Ação",
    class: "yellow darken-1 white--text text-body-1 rounded-tr-lg",
    value: "sd001_nr_filial",
    width: 100,
  },
];
export default {
  components: {
    FormCadastroEmpresa,
    FormCadastroFilial,
    DetalhesLoja,
    "multiline-filter": MultilineFilter,
  },
  data: function () {
    return {
      searchText: "",
      searchInput: null,
      columns,
      exibeConsulta: false,
      flex: null,
      moment: moment,
      lojaInstituicao: null,
      nomeRazao: null,
      gridFilter: null,
      dataSemanal: null,
      visibleModalCadastroLoja: false,
      visibleVisualizarLoja: false,
      dadosDaLoja: null,
      itensSelecionaveis,
      isMobileWidth: false,
      showEndereco: false,
      resultadoPesquisa: [],
      isRepresentante: false,
      visibleModalCadastro: false,
      headers: [],
      opcoes: [
        {
          value: "SD001_NR_INST",
          text: "Empresa",
          type: ["number"],
        },
        {
          value: "CE045_NR_CNPJ",
          text: "CNPJ",
          type: ["text"],
          mask: ["##.###.###/####-##"],
        },
        {
          value: "SD001_NR_FILIAL",
          text: "Nr. filial",
          type: ["text"],
        },
        {
          value: "CE045_NM_FANTAS",
          text: "Nome fantasia",
          type: ["text"],
        },
        {
          value: "CE045_NM_RAZAO",
          text: "Razão social",
          type: ["text"],
        },
        {
          value: "SD001_DT_CONTR",
          text: "Dt. cadastro",
          type: ["calendar"],
        },
        {
          value: "CE045_CD_SITUAC",
          text: this.$t("OPTIONS.situacao"),
          type: ["select"],
          options: [...itensSelecionaveis.situacao],
        },
        {
          value: "CE045_NM_CIDADE",
          text: "Cidade",
          type: ["text"],
        },
        {
          value: "CE045_SG_ESTADO",
          text: "UF",
          type: ["select"],
          options: [...itensSelecionaveis.ufs],
        },
      ],
    };
  },
  created() {
    // Largura de tela em pixels
    this.isMobileWidth = window.innerWidth < 768;
    window.addEventListener("resize", () => {
      this.isMobileWidth = window.innerWidth < 768;
    });
  },
  async mounted() {
    this.dataSemanal = moment().subtract(7, "days").format("YYYYMMDD");
    moment.locale("pt-BR");

    // Validação dos logins de representantes de forma temporária. Será trocada pelo processo de perfil
    let usuario = await this.$wso2.getUserData();
    let usuariosPermitidos = [
      "LILIAN.DAVILA",
      "CK.SAASTEC",
      "SUSANA.MARTINS",
      "BEATRIZ.BURATTO",
      "DAYANE.MOURA",
      "WADELSON.ITTNER",
      "JESSICA.DUTRA",
    ];
    this.isRepresentante = usuariosPermitidos.includes(usuario.base.us01_nm_login.toUpperCase());
  },
  methods: {
    async alterarSituacao(value, nrCnpj) {
      let opcao;
      let descricao;

      switch (value) {
      case 1:
        opcao = "ativar";
        descricao =
          "Ao ativar a filial, ela estará apta para voltar a utilizar os produtos contratados";
        break;

      case 2:
        opcao = "bloquear";
        descricao =
          "Ao bloquear essa filial, ela estará temporariamente bloqueada para utilizar os produtos contratados. Você poderá ativa-la novamente caso preferir.";
        break;

      case 3:
        opcao = "encerrar";
        descricao =
          "Ao encerrar essa filial, ela não possuirá nenhum acesso aos produtos contratados e entrará em processo de exclusão de dados após um período de 6 (seis) meses sem alteração de situação. É recomendado essa alteração somente para lojas que cancelaram o contrato.";
        break;
      }

      Swal.fire({
        title: `Tem certeza que deseja ${opcao} essa filial?`,
        text: descricao,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#00B0FF",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: `Sim, ${opcao}.`,
      }).then(async (result) => {
        if (result.value) {
          let user = await this.$wso2.getUserData();

          const objeto = {
            filtros: [
              {
                ENT_NR_CNPJ: nrCnpj.replace(/[^\d]+/g, ""),
                ENT_CD_SITUAC: String(value),
              },
            ],
          };

          let response = await this.$wso2.get(
            { functionName: "SD.SP_SD940101005", server: "NDW", versao: "1" },
            10944,
            process.env.VUE_APP_CD_SIST,
            user.base.us01_nm_login,
            objeto,
            null,
            null
          );

          if (response.database[0]) {
            const index = this.resultadoPesquisa.findIndex(
              (item) => item.ce045_nr_cnpj === nrCnpj
            );

            this.resultadoPesquisa[index].ce045_cd_situac = value;
            console.log(
              response.database[0],
              value,
              "index" + index,
              this.resultadoPesquisa[index]
            );
            Swal.fire(
              "Situação alterada!",
              "A filial obteve alteração da situação com sucesso.",
              "success"
            );
          }
        }
      });
    },
    handleSearch(selectedKeys, confirm) {
      confirm();
      this.searchText = selectedKeys[0];
    },

    handleReset(clearFilters) {
      clearFilters();
      this.searchText = "";
    },
    formatarCampos(obj) {
      if (obj["sd001_vl_mensal"]) {
        obj["sd001_vl_mensal"] = obj["sd001_vl_mensal"]
          .toString()
          .toLocaleString("pt-br", { style: "currency", currency: "BRL" });
      }

      if (obj["ce045_nr_cnpj"]) {
        obj["ce045_nr_cnpj"] = obj["ce045_nr_cnpj"].replace(
          /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
          "$1.$2.$3/$4-$5"
        );
      }

      if (obj["sd001_dt_contr"]) {
        obj["sd001_dt_contr"] = String(obj["sd001_dt_contr"]);
      }
    },
    alertarErro(erro) {
      this.$notification["warning"]({
        message: "Empresa",
        description: erro.message,
      });
    },
    handleOk() {
      this.visibleModalCadastroLoja = false;
      this.visibleModalCadastro = false;
      this.visibleVisualizarLoja = false;
    },
    exibirModalCadastroLoja(inst, nmRazao) {
      this.visibleModalCadastroLoja = true;
      this.lojaInstituicao = inst;
      this.nomeRazao = nmRazao;
    },
    exibirDetalhesLoja(valorLoja) {
      this.visibleVisualizarLoja = true;
      this.dadosDaLoja = valorLoja;
      this.showEndereco = valorLoja.sd001_nm_end !== "";
    },
    corSituacao(value) {
      switch (value) {
      case 1:
        return "light-blue accent-3";
      case 2:
        return "red";
      case 3:
        return "blue-grey lighten-4";
      }
    },
    async consultarServico(obj) {
      const loader = this.$loading.show();
      let usuario = await this.$wso2.getUserData();

      if (obj.filtros[0].parametro == "CE045_NR_CNPJ") {
        obj.filtros[0].valor1 = obj.filtros[0].valor1.replace(/[^\d]+/g, "");
      }

      if (!this.isRepresentante) {
        let _tam = obj.filtros.length - 1;
        obj.filtros[_tam].condicao = 1;
        obj.filtros.push({
          linha: obj.filtros.length + 1,
          criterio: 3,
          parametro: "SD001_CD_USRREP",
          valor1: usuario.base.us01_nr_usr,
          valor2: null,
          condicao: null,
        });
      }

      try {
        let retorno = await this.$wso2.get(
          { functionName: "SD.SP_SD940101004", server: "NDW", versao: "1" },
          usuario.base.ce040_nr_inst,
          process.env.VUE_APP_CD_SIST,
          usuario.base.us01_nm_login,
          obj
        );
        if (!retorno.database.length) {
          this.$notification["warning"]({
            message: "Empresa",
            description: "A pesquisa não retornou valores",
          });
          this.exibeConsulta = false;
        } else {
          this.resultadoPesquisa = retorno.database;
          this.resultadoPesquisa.forEach((obj) => {
            this.formatarCampos(obj);
          });
          this.exibeConsulta = true;
          this.$notification["success"]({
            message: "Empresa",
            description: "A consulta foi realizada com sucesso",
          });
        }
      } catch (error) {
        this.exibeConsulta = false;
        console.log(error);
        this.$notification["error"]({
          message: "Empresa",
          description: "Não foi possível recuperar dados do relatório",
        });
      } finally {
        loader.hide();
      }
    },
    exibirModalCadastro() {
      this.visibleModalCadastro = true;
    },
  },
};
</script>

<style lang="scss">
.rep {
  border: 1px solid #d7dbdd;
  padding: 5px;
  text-align: center;
}

@import "style.module";

.custom-filter-dropdown {
  padding: 8px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
.highlight {
  background-color: rgb(50, 124, 31);
  padding: 0px;
}
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  height: 40px !important;
}
</style>

