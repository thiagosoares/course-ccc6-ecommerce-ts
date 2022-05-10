import Coupon from "../../src/domain/entity/Coupon";

test("GIVEN a valid input, WHEN create a coupon, THEN create a coupon", function() {
	const coupon = new Coupon("VALE20", 20);
	expect(coupon).toBeTruthy()
});

test("GIVEN a valid input, WHEN apply discount, THEN calculate the value with discount", function() {
	const coupon = new Coupon("VALE20", 20);
	expect(coupon.applyDiscount(1000)).toBe(800);
});

test("GIVEN a valid date, WHEN check the validity, THEN get valid", function() {
	const coupon = new Coupon("VALE20", 20, new Date("2021-03-10T10:00:00"));
	const isExpired = coupon.isExpired(new Date("2021-03-09T10:00:00"));
	expect(isExpired).toBeFalsy();
});

test("GIVEN a expired date, WHEN check the validity, THEN get invalid", function() {
	const coupon = new Coupon("VALE20", 20, new Date("2021-03-10T10:00:00"));
	const isExpired = coupon.isExpired(new Date("2021-03-11T10:00:00"));
	expect(isExpired).toBeTruthy();
});