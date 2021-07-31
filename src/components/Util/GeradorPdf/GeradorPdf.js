import jsPDF from "jspdf";
import util from "../util.js";
import moment from "moment";
import "moment/locale/pt-br";
import JsBarcode from 'jsbarcode';

// Classe para gerenciar a criacao de pdf
export default class GeradorPdf {


  static gerar(sec = [], cnpj = "00000000000000") {


    // Validação de entrada vazia (modelo de testes)
    var sections = sec;
    if(sec.length === 0)
      sections = [
        {
          title: "Termo de cadastro",
        },
        {
          rows: [
            [
              {
                label: "título",
                content: "texto",
                position: 0,
              },
              {
                label: "título",
                content: "texto",
                position: 50,
              },
            ],
          ],
        },
        {
          // [Título Secundário e Sessão]
          title: "título",
          rows: [
            [
              {
                label: "título",
                content: "texto",
                position: 0,
              },
              {
                label: "título",
                content: "texto",
                position: 50,
              },
            ],
            [
              {
                label: "título",
                content: "texto",
                position: 0,
              },
              {
                label: "título",
                content: "texto",
                position: 20,
              },
              {
                label: "título",
                content: "texto",
                position: 43,
              },
              {
                label: "título",
                content: "texto",
                position: 63,
              },
            ],
            [
              {
                label: "título",
                content: "texto",
                position: 0,
              },
            ],
          ],
        },
        {
          title: "título",
          rows: [
            [
              { label: "título", content: "texto", position: 0 },
              { label: "título", content: "texto", position: 33 },
              {
                label: "título",
                content: "texto",
                position: 66,
              },
            ],
            [
              {
                label: "título",
                content:"texto",
                position: 0,
              },
              {
                label: "título",
                content:"texto",
                position: 50,
              },
            ],
          ],
        },
        {
          title: "título",
          rows: [
            [
              {
                label: "título",
                content: "texto",
                position: 0,
              },
              { label: "título", content: "texto", position: 30 },
              {
                label: "título",
                content: "texto",
                position: 50,
              },
            ],
            [
              {
                label: "título",
                content: "texto",
                position: 0,
              },
            ],
          ],
        },
        {
          title: "título",
          rows: [
            [
              {
                label: "título",
                content: "texto",
                position: 0,
              },
              {
                label: "título",
                content: "texto",
                position: 25,
              },
              { label: "título", content: "texto", position: 50 },
              {
                label: "título",
                content: "texto",
                position: 75,
              },
            ],
            [
              {
                label: "título",
                content: "texto",
                position: 0,
              },
              {
                label: "título",
                content: "texto",
                position: 50,
              },
            ],
          ],
        },
        {
          title: "Negociação Comercial",
          header: "Mensalidade",
          rows: [
            [
              {
                label: "Plano contratado",
                content: "BÁSICO",
                position: 0,
              },
              {
                label: "Valor mensalidade",
                content: "R$ 75,90",
                position: 33,
              },
              {
                label: "Data primeira parcela",
                content: "27/07/2021",
                position: 66,
              },
            ],
          ],
        },
        {
          header: "Implantação ERP",
          rows: [
            [
              {
                label: "Valor implantação",
                content: "R$ 75,90",
                position: 0,
              },
              {
                label: "Nr. parcelas",
                content: "4",
                position: 20,
              },
              {
                label: "Data primeira parcela",                
                content: "27/07/2021",
                position: 40,
              },
              {
                label: "Responsável pela implantação",                
                content: "Externo - por terceiro",
                position: 65,
              },
            ],
          ],
        },
        {
          header: "Implantação SaaSEcomm",
          rows: [
            [
              {
                label: "Valor implantação",
                content: "R$ 75,90",
                position: 0,
              },
              {
                label: "Nr. parcelas",
                content: "4",
                position: 20,
              },
              {
                label: "Data primeira parcela",                
                content: "27/07/2021",
                position: 40,
              },
              {
                label: "Responsável pela implantação",                
                content: "Interno - pela SaaSTec",
                position: 65,
              },
            ],
            [
              {
                label: "Valor módulo integrador mensal",
                content: "R$ 75,90",
                position: 0,
              },
            ],
          ],
        },
        {
          title: "título",
          rows: [
            [
              { label: "título", content: "texto", position: 0 },
              { label: "título", content: "texto", position: 50 },
            ],
          ],
        },
      ];

    // Instanciação de um documento
    var doc = new jsPDF('p', 'mm', 'a4', true);

    // Responsividade PDF
    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight = doc.internal.pageSize.getHeight();
    const pdfHorizontalCenter = pdfWidth / 2;

    // Responsividade de roundedRect (rc)
    const rcWitdh = pdfWidth * 0.90;
    const rcXOffset = (pdfWidth * 0.10) / 2;
    const rcBorderRadius = 2;
    const rcHalfRow = 6;
    const rcOneRow = rcHalfRow * 1.3;
    const rcTextYOffset = 1.2;
    const rcTextXPadding = 1.5;
    const rcTextYPaddingLabel = 3;
    const rcTextYPaddingContent = 7.3;

    // Responsividade de sessões
    let sectionHeight = 0;
    const sapceBetweenSections = 3;

    // Dados do pdf (imagens, labels e conteúdos)
    const logoSaastecLogo = util.chamaBase64(1);
    const logoSaastecRodape = util.chamaBase64(2);

    // Tamanhos de fonte
    const fontetítulo = 14;
    const fonteSubtítulo = 12;
    const fonteCabecalhoSessao = 10.5;
    const fonteLabel = 9;
    const fonteConteudo = 10;

    /** 
     * Objetos de sessão
     *  título - texto com caixa amarela
     *  header - subtitulo de um retângulo
     *  rows - array com as Sessões
     *   label - nome da campo
     *   content - conteúdo do campo
     *   position - possiçao do campo [0,100]
     */

    const generateSectionTitle = (title) => {
      doc.setFontStyle("bold").setFontSize(fontetítulo)
        .text(title, pdfHorizontalCenter, sectionHeight, 'center');
    }

    const generateSectionSubtitle = (subtitle) => {
      doc.setFillColor(253, 208, 40)
        .roundedRect(rcXOffset, sectionHeight, rcWitdh, rcHalfRow, rcBorderRadius, rcBorderRadius, 'F')
        .setFontSize(fonteSubtítulo).setFontStyle("bold")
        .text(subtitle, pdfHorizontalCenter, sectionHeight + rcHalfRow - rcTextYOffset, 'center');
      sectionHeight += rcHalfRow
    }

    const generateSectionHeader = (header) => {
      doc.setFontSize(fonteCabecalhoSessao).setFontStyle("bold")
        .text(header, rcXOffset, sectionHeight + rcHalfRow - rcTextYOffset, 'left');
      sectionHeight += rcHalfRow;
    }

    const generateRoundRectangle = (rows) => {
      const numeroDeLinhas = rows.length;
      if (rows.lenght == 0) return;

      doc.setDrawColor(128,128,128).roundedRect(rcXOffset, sectionHeight, rcWitdh, rcOneRow * numeroDeLinhas, rcBorderRadius, rcBorderRadius)
      let rcLineXOffset = rcXOffset
      rows.forEach((row, index) => {
        row.forEach(field => {
          rcLineXOffset = (rcWitdh * (field.position / 100)) + rcXOffset;
          field.position != 0 && doc.line(rcLineXOffset, sectionHeight, rcLineXOffset, sectionHeight + rcOneRow);
          doc.setFontStyle("bold").setFontSize(fonteLabel).text(field.label, rcLineXOffset + rcTextXPadding, sectionHeight + rcTextYPaddingLabel);
          doc.setFontStyle("normal").setFontSize(fonteConteudo).text(field.content, rcLineXOffset + rcTextXPadding, sectionHeight + rcTextYPaddingContent);
        })
        index != 0 && doc.line(rcXOffset, sectionHeight, rcXOffset + rcWitdh, sectionHeight);
        sectionHeight += rcOneRow;
      })
    }

    const generateSpaceBetweenSections = () => {
      sectionHeight += sapceBetweenSections;
    }

    const generateHalfSpaceBetweenSections = () => {
      sectionHeight += sapceBetweenSections / 2;
    }

    const generateSections = (arrayOfSectoins) => {
      arrayOfSectoins.forEach((section, index) => {
        // caso em que o retangulo da sessao atual não tem header, mas a anterior sim
        let primeiraSessao = index == 0;
        if(!primeiraSessao) {
          let ultimaTemHeader = typeof arrayOfSectoins[index-1].header !== 'undefined';
          let atualSemHeader = typeof arrayOfSectoins[index].header === 'undefined';
          if(ultimaTemHeader && atualSemHeader) {
            console.log(section);
            generateHalfSpaceBetweenSections();
          }
        }

        if (typeof section.title !== 'undefined'){
          if (typeof section.rows !== 'undefined') {
            generateSectionSubtitle(section.title);
          } else {
            generateSectionTitle(section.title);
          }
        }
        if (typeof section.rows !== 'undefined') {
          if (typeof section.header !== 'undefined') {
            generateSectionHeader(section.header);
            generateHalfSpaceBetweenSections();
          } else {
            generateSpaceBetweenSections();
          }

          generateRoundRectangle(section.rows);

          if (typeof section.header !== 'undefined') {
            generateHalfSpaceBetweenSections();
          } else {
            generateSpaceBetweenSections();
          }
        }
      })
    }

    const generateDocument = () => {
      // Cabeçalho
      doc.addImage(logoSaastecLogo, "PNG", 20, sectionHeight + 10, 170, 18, '', 'FAST');

      // Título, Representante e Produtos
      sectionHeight = 38

      // Sessões
      generateSections(sections)

      // Código de Barras
      JsBarcode('#barras-cnpj', cnpj, {
        width: 4,
        height: 55,
        margin: 5,
        fontSize: 20,
        background: '#ffffff00',
      });
  
      var img = document.getElementById('barras-cnpj');

      var formatedSrc = img.src.split()[0].split(',')[1]

      doc.addImage(formatedSrc, "png", pdfWidth * 0.95 - 50, pdfHeight - 37, 50, 10.5,'','FAST');
  
      // Rodapé
      let dataDeCadastro = "Cadastro gerado em " + moment().format("DD/MM/YYYY").concat(" " + moment().format("LT"));
      doc.setFontSize(8).setFontStyle("bold")
        .text(dataDeCadastro, pdfHorizontalCenter, sectionHeight + rcTextYPaddingLabel, "center")
        .addImage(logoSaastecRodape, "PNG", 0, 272, pdfWidth, 26, '', 'FAST')

      // Links de redes sociais
      doc.link(21, pdfHeight - 6, 6, 5, { url: 'https://youtube.com/saastec' })
      doc.link(27, pdfHeight - 6, 6, 5, { url: 'https://www.facebook.com/saastecbrasil/' })
      doc.link(33, pdfHeight - 6, 6, 5, { url: 'https://br.linkedin.com/company/saastec' })
      doc.link(39, pdfHeight - 6, 6, 5, { url: 'https://www.instagram.com/saastec/' })
    }

    generateDocument();
    return doc;
  }
}