import { validate } from "../src/CpfValidatorBase"

// Success

test("GIVEN a valid CPF with mask, WHEN validate, THEN assert true", function() {
    expectTrue("115.906.360-58")
})

test("GIVEN a valid CPF with no mask, WHEN validate, THEN assert true", function() {
    expectTrue("11590636058")
})


// Errors

test("GIVEN a null CPF, WHEN validate, THEN assert false", function() {
    expectFalse(null)
})

test("GIVEN a undefined CPF, WHEN validate, THEN assert false", function() {
    expectUndefined(undefined)
})

test("GIVEN a invalid CPF, WHEN validate, THEN assert false", function() {
    expectFalse("123.456.789-00")
})

test("GIVEN a invalid CPF with no mask, WHEN validate, THEN assert false", function() {
    expectFalse("12345678900")
})

test("GIVEN a CPF with invalid verifying digit, WHEN validate, THEN assert false", function() {
    expectFalse("115.906.360-00")
})

test("GIVEN a CPF with invalid verifying digit, WHEN validate, THEN assert false", function() {
    expectFalse("115.906.360-00")
})

test("GIVEN a CPF with size less than 11, WHEN validate, THEN assert false", function() {
    expectFalse("1159063600")
})

test("GIVEN a CPF with size more than 14, WHEN validate, THEN assert false", function() {
    expectFalse("115.906.360.000-00")
})

function expectTrue(cpf: string) {
    expect(validate(cpf)).toBe(true)
}

function expectFalse(cpf?: string | null) {
    expect(validate(cpf)).toBe(false)
}

function expectUndefined(cpf?: string | null) {
    expect(validate(cpf)).toBe(undefined)
}