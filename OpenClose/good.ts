// Open/Closed Principle (OCP)
// Classes should be open for extension but closed for modification.

class DiscountCalculator {
  // The calculateDiscount method takes an amount and an optional discount function (discountFn).
  // By accepting a callable function, this method is "open for extension" because new discount logic can be passed in
  // without modifying the class itself.
  calculateDiscount(amount: number, discountFn?: CallableFunction): number {
    // If a discount function is provided, it calculates the discount using that function.
    if (discountFn) {
      return discountFn(amount);
    } else {
      // If no discount function is provided, it defaults to no discount.
      return 0; // No discount
    }
  }
}

// Example discount functions encapsulate individual discount logic.
// These are "extensions" that can be added without modifying DiscountCalculator.

const regularDiscount = (amount: number) => amount * 0.05; // 5% discount for regular customers
const premiumDiscount = (amount: number) => amount * 0.1; // 10% discount for premium customers
const goldDiscount = (amount: number) => amount * 0.15; // 15% discount for gold customers

// main code
const calculator = new DiscountCalculator();

// The DiscountCalculator class is reusable and works with any discount function passed to it.
// Adding new discount types (like diamondDiscount) does not require modifying the class itself.

console.log("Regular Discount:", calculator.calculateDiscount(1000, regularDiscount)); // 5% discount
console.log("Premium Discount:", calculator.calculateDiscount(1000, premiumDiscount)); // 10% discount
console.log("Gold Discount:", calculator.calculateDiscount(1000, goldDiscount));       // 15% discount
console.log("No Discount:", calculator.calculateDiscount(1000));                      // 0% discount (default)

// Adding a new discount type, e.g., "diamond", is simple and requires no changes to the DiscountCalculator class.
const diamondDiscount = (amount: number) => amount * 0.2; // 20% discount for diamond customers
console.log("Diamond Discount:", calculator.calculateDiscount(1000, diamondDiscount)); // 20% discount