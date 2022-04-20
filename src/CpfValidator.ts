
export function validateCpf (cpf?: string | null) {

    if (cpf == null) {
        return false
    }
    if (cpf.length < 11 && cpf.length > 14) {
        return false
    }

    cpf = cpf
        .replace('.','')
        .replace('.','')
        .replace('-','')
        .replace(" ","");

    if (cpf.split("").every(c => c === cpf?.substring(0,1))) { // TODO FUNC Condição para evitar cpfs como 111.111.111-11
        return false
    }

    let sumFirstCheckDigit = 0
    let sumSecondCheckDigit = 0
    let firstCheckDigit, secondCheckDigit
    let divisionRest

    // For into each number on CPF - Make Sum
    for (let nCount = 1; nCount < cpf.length -1; nCount++) {  // TODO For confurso. Não Percorre até os Digitos
        let digito = parseInt(cpf.substring(nCount -1, nCount));
        sumFirstCheckDigit = sumFirstCheckDigit + ( 11 - nCount ) * digito;
        sumSecondCheckDigit = sumSecondCheckDigit + ( 12 - nCount ) * digito;
    }

    divisionRest = (sumFirstCheckDigit % 11);

    firstCheckDigit = (divisionRest < 2) ? 0 : 11 - divisionRest;
    sumSecondCheckDigit += 2 * firstCheckDigit;

    divisionRest = (sumSecondCheckDigit % 11);

    secondCheckDigit = divisionRest < 2 ? 0 : 11 - divisionRest

    let originalCheckDigit = cpf.substring(cpf.length-2, cpf.length);
    let calculatedCheckDigit = "" + firstCheckDigit + "" + secondCheckDigit;

    return originalCheckDigit == calculatedCheckDigit; // TODO Nome de Variavel
}
