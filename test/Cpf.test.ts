

// Success

import Cpf from "../src/Cpf";

test("GIVEN a valid CPF with mask, WHEN validate, THEN assert true", function() {
    expectValid("115.906.360-58")
})

test("GIVEN a valid CPF with no mask, WHEN validate, THEN assert true", function() {
    expectValid("11590636058")
})

test("GIVEN a valid CPF with first verifier equals 2, WHEN validate, THEN assert true", function() {
    expectValid("252.002.360-02")
})

test("GIVEN a valid CPF with first verifier less than 2, WHEN validate, THEN assert true", function() {
    expectValid("862.869.870-10")
})

// Errors

test("GIVEN a blank CPF, WHEN validate, THEN assert false", function() {
    expectInvalid("", Cpf.ERROR_INVALID_SIZE)
})

test("GIVEN a invalid CPF, WHEN validate, THEN assert false", function() {
    expectInvalid("123.456.789-00")
})

test("GIVEN a invalid CPF with no mask, WHEN validate, THEN assert false", function() {
    expectInvalid("12345678900")
})

test("GIVEN a CPF with invalid verifying digit, WHEN validate, THEN assert false", function() {
    expectInvalid("115.906.360-00")
})

test("GIVEN a CPF with size less than 11, WHEN validate, THEN assert false", function() {
    expectInvalid("1159063600", Cpf.ERROR_INVALID_SIZE)
})

test("GIVEN a CPF with size EQUALS 13, WHEN validate, THEN assert false", function() {
    expectInvalid("1150906.3600-00", Cpf.ERROR_INVALID_SIZE)
})

test("GIVEN a CPF with size more than 14, WHEN validate, THEN assert false", function() {
    expectInvalid("115.906.360.000-00", Cpf.ERROR_INVALID_SIZE)
})

test("GIVE a All 1 CPF, WHEN validate, THEN assert false", function() {
    expectInvalid("11111111111", Cpf.ERROR_INVALID_PATTERN)
})

test("GIVE a invalid CPF with letters, WHEN validate, THEN assert false", function() {
    expectInvalid("111.111.11X-11", Cpf.ERROR_INVALID_SIZE)
})

test("GIVE a invalid CPF with letters on check digits, WHEN validate, THEN assert false", function() {
    expectInvalid("115.906.360.000-XY", Cpf.ERROR_INVALID_SIZE)
})

const wrongAllDigits = [
    "111.111.111-11",
    "222.222.222-22",
    "333.333.333-33"
]

test.each(wrongAllDigits)("GIVE a All %p CPF, WHEN validate, THEN assert false", function(cpf) {
    expectInvalid(cpf, Cpf.ERROR_INVALID_PATTERN)
})


function expectValid(cpf: string) {
    expect(new Cpf(cpf).cpf).toEqual(cpf)
}

function expectInvalid(cpf: string, message: string = Cpf.ERROR_INVALID_CPF) {
    expect(() => new Cpf(cpf)).toThrow(new Error(message))
}