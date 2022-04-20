
export function validateCpf (cpf?: string | null) {

	if (cpf !== null) {
        if (cpf !== undefined) {
            if (cpf.length >= 11 && cpf.length <= 14) {  // FIXME Condição zoada. Permite valores com size 1 por exemplo

                cpf = cpf
                    .replace('.','')
                    .replace('.','')
                    .replace('-','')
                    .replace(" ","");
                


                if (!cpf.split("").every(c => c === cpf?.substring(0,1))) { // FIXME Condição para evitar cpfs como 111.111.111-11


                    let sumFirstCheckDigit = 0
                    let sumSecondCheckDigit = 0;
                    let firstCheckDigit, secondCheckDigit, rest;
                    sumFirstCheckDigit = sumSecondCheckDigit = 0;

                    // let digito;
                    for (let nCount = 1; nCount < cpf.length -1; nCount++) {
                        let digito = parseInt(cpf.substring(nCount -1, nCount));
                        sumFirstCheckDigit = sumFirstCheckDigit + ( 11 - nCount ) * digito;
                        sumSecondCheckDigit = sumSecondCheckDigit + ( 12 - nCount ) * digito;
                    }

                    rest = (sumFirstCheckDigit % 11);

                    firstCheckDigit = (rest < 2) ? 0 : 11 - rest;
                    sumSecondCheckDigit += 2 * firstCheckDigit;
                    rest = (sumSecondCheckDigit % 11);

                    if (rest < 2) {  //  TODO If sem {}. Que droga
                        secondCheckDigit = 0;
                    } else {
                        secondCheckDigit = 11 - rest;
                    }

                    let nDigVerific = cpf.substring(cpf.length-2, cpf.length);
                    let nDigResult = "" + firstCheckDigit + "" + secondCheckDigit;
                    return nDigVerific == nDigResult; // TODO Nome de Variavel

                } else return false
            } else return false // FIXME Necessário arrumar o IF para cair no else
        } else return false
	} else return false
}