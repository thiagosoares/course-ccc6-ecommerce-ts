

export default class Cpf {

    private CPF_LENGTH = 11;
    private CPF_BODY_LENGTH = 9;

    static ERROR_INVALID_CPF = "Invalid CPF"
    static ERROR_INVALID_SIZE = "Invalid CPF size"
    static ERROR_INVALID_PATTERN = "Invalid CPF pattern"

    readonly cpf: string

    constructor(cpf: string) {
        this.validate(cpf)
        this.cpf = cpf
    }

    private validate (cpf: string) {

        let digits = this.splitDigits(cpf)
        this.validateFormat(digits)
        let bodyDigits = this.getBodyDigits(digits)
        let firstCheckDigit = this.getCheckDigit(bodyDigits)
        this.concatFirstDigitOnBody(bodyDigits, firstCheckDigit)
        let secondCheckDigit = this.getCheckDigit(bodyDigits)
        let originalCheckDigit = this.getOriginalCheckDigits(digits)
        let calculatedCheckDigit = this.getCalculatedCheckDigit(firstCheckDigit, secondCheckDigit)
        let isInvalid = originalCheckDigit != calculatedCheckDigit

        if (isInvalid) {
            throw new Error(Cpf.ERROR_INVALID_CPF)
        }

    }

    private getCalculatedCheckDigit(firstCheckDigit: number, secondCheckDigit: number) {
        return `${firstCheckDigit}${secondCheckDigit}`;
    }

    private splitDigits(cpf: string) {
        return this.unmask(cpf).split("")
    }

    private getBodyDigits(digits: string[]) {
        return digits.slice(0, this.CPF_BODY_LENGTH);
    }

    private getCheckDigits(digits: string[]) {
        return digits.slice(-2);
    }

    private validateFormat(digits: string[]) {
        if (digits.length != this.CPF_LENGTH) {
            throw new Error(Cpf.ERROR_INVALID_SIZE);
        }
        if (digits.every(c => c === digits[0])) {
            throw new Error(Cpf.ERROR_INVALID_PATTERN);
        }
    }

    private getCheckDigit(digits: string[]) {
        let sumFirstCheckDigit = 0
        let baseMultiplier = digits.length + 1
        for (let i = 0; i < digits.length; i++) {
            sumFirstCheckDigit += ( baseMultiplier - i ) * parseInt(digits[i]);
        }
        let divisionRest = (sumFirstCheckDigit % this.CPF_LENGTH);
        return (divisionRest < 2) ? 0 : this.CPF_LENGTH - divisionRest;
    }

    private concatFirstDigitOnBody(bodyDigits: string[], firstCheckDigit: number) {
        bodyDigits.push(firstCheckDigit.toString())
    }

    private getOriginalCheckDigits(digits: string[]) {
        return this.getCheckDigits(digits).join('')
    }

    private unmask(cpf: string) {
        return cpf.replace(/\D/g, '');
    }

}


