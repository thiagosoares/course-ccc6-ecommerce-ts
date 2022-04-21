

export default class CpfValidator {

    private static CPF_LENGTH = 11;
    private static CPF_BODY_LENGTH = 9;

    static validateCpf (cpf: string) {

        try {
            let digits = this.splitDigits(cpf)
            let bodyDigits = this.getBodyDigits(digits)
            this.validateFormat(digits)
            let firstCheckDigit = this.getCheckDigit(bodyDigits)
            this.concatFirstDigitOnBody(bodyDigits, firstCheckDigit)
            let secondCheckDigit = this.getCheckDigit(bodyDigits)
            let originalCheckDigit = this.getOriginalCheckDigits(digits)
            let calculatedCheckDigit = this.getCalculatedCheckDigit(firstCheckDigit, secondCheckDigit)
            return originalCheckDigit == calculatedCheckDigit
        } catch (e) {
            return false
        }
    }

    private static getCalculatedCheckDigit(firstCheckDigit: number, secondCheckDigit: number) {
        return firstCheckDigit + "" + secondCheckDigit;
    }

    private static splitDigits(cpf: string) {
        return this.unmask(cpf).split("")
    }

    private static getBodyDigits(digits: string[]) {
        return digits.slice(0, this.CPF_BODY_LENGTH);
    }

    private static getCheckDigits(digits: string[]) {
        return digits.slice(this.CPF_BODY_LENGTH, this.CPF_LENGTH);
    }

    private static validateFormat(cpf: string[]) {
        if (cpf.length != this.CPF_LENGTH) {
            throw new Error("Invalid CPF size");
        }
        if (cpf.every(c => c === cpf[0])) {
            throw new Error("Invalid CPF pattern");
        }
    }

    private static getCheckDigit(digits: string[]) {
        let sumFirstCheckDigit = 0
        for (let i = 0; i < digits.length; i++) {
            sumFirstCheckDigit = sumFirstCheckDigit + ( digits.length + 1 - i ) * parseInt(digits[i]);
        }
        let divisionRest = (sumFirstCheckDigit % this.CPF_LENGTH);
        return (divisionRest < 2) ? 0 : this.CPF_LENGTH - divisionRest;
    }

    private static concatFirstDigitOnBody(bodyDigits: string[], firstCheckDigit: number) {
        bodyDigits.push(firstCheckDigit.toString())
    }

    private static getOriginalCheckDigits(digits: string[]) {
        return this.getCheckDigits(digits).join('')
    }

    private static unmask(cpf: string) {
        return cpf.replace(/\D/g, '');
    }

}


