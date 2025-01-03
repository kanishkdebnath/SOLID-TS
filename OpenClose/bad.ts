export class DiscountCalculator {
  // This method is responsible for calculating discounts based on customer type.
  // However, it uses a series of 'if-else' conditions, making the code difficult to maintain and extend.
  calculateDiscount(type: string, amount: number): number {
    // Violates OCP: Adding a new type (e.g., "diamond") requires modifying this method,
    // which means the class is not closed for modification.
    if (type === "regular") {
      return amount * 0.05; // 5% discount for regular customers
    } else if (type === "premium") {
      return amount * 0.1; // 10% discount for premium customers
    } else if (type === "gold") {
      return amount * 0.15; // 15% discount for gold customers
    } else {
      return 0; // No discount
    }
  }
}

// main code
const calculator = new DiscountCalculator();

// Works fine for current types, but if a new discount type is added,
// you must modify the `calculateDiscount` method, violating OCP.
console.log("Regular Discount:", calculator.calculateDiscount("regular", 1000));
console.log("Premium Discount:", calculator.calculateDiscount("premium", 1000));
console.log("Gold Discount:", calculator.calculateDiscount("gold", 1000));
console.log("No Discount:", calculator.calculateDiscount("none", 1000));