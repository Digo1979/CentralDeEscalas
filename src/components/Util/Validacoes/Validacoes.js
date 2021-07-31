
/**
 * Classe Validacoes contém funções que validam campos e retornam true ou false
 * 
 */
export default class Validacoes {

  static validarCnpj(nrCnpj) {
    nrCnpj = nrCnpj.replace(/[^\d]+/g, "");
    if (nrCnpj == "") return false;
    if (nrCnpj.length != 14) return false;
  
    // Elimina CNPJs invalidos conhecidos
    if (
      nrCnpj == "00000000000000" ||
      nrCnpj == "11111111111111" ||
      nrCnpj == "22222222222222" ||
      nrCnpj == "33333333333333" ||
      nrCnpj == "44444444444444" ||
      nrCnpj == "55555555555555" ||
      nrCnpj == "66666666666666" ||
      nrCnpj == "77777777777777" ||
      nrCnpj == "88888888888888" ||
      nrCnpj == "99999999999999"
    )
      return false;
  
    // Valida DVs
    let tamanho = nrCnpj.length - 2;
    let numeros = nrCnpj.substring(0, tamanho);
    const digitos = nrCnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(0)) return false;
  
    tamanho = tamanho + 1;
    numeros = nrCnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(1)) return false;
  
    return true;
  }

  static validarEmail(email) {
    const padrao = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return padrao.test(email)
  }
}