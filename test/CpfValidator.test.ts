import { validateCpf } from "../src/CpfValidator"

// Success

test("GIVEN a valid CPF with mask, WHEN validate, THEN assert true", function() {
    expectTrue("115.906.360-58")
})

test("GIVEN a valid CPF with no mask, WHEN validate, THEN assert true", function() {
    expectTrue("11590636058")
})

test("GIVEN a valid CPF with first verifier equals 2, WHEN validate, THEN assert true", function() {
    expectTrue("252.002.360-02")
})

test("GIVEN a valid CPF with first verifier less than 2, WHEN validate, THEN assert true", function() {
    expectTrue("862.869.870-10")
})

// Errors

test("GIVEN a null CPF, WHEN validate, THEN assert false", function() {
    expectFalse(null)
})

test("GIVEN a undefined CPF, WHEN validate, THEN assert false", function() {
    expectFalse(undefined)
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

test("GIVEN a CPF with size more than 14, WHEN validate, THEN assert false", function() {
    expectFalse("115.906.360.000-00")
})

test("GIVE a All 1 CPF, WHEN validate, THEN assert false", function() {
    expectFalse("11111111111")
})



function expectTrue(cpf: string) {
    expect(validateCpf(cpf)).toBe(true)
}

function expectFalse(cpf?: string | null) {
    expect(validateCpf(cpf)).toBe(false)
}