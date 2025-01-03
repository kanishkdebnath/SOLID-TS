// LoanPayment interface defines common contract for loan payments
export interface LoanPayment {
  doPayment(): void; // Payment functionality (implemented in subclasses)
  foreCloseLoan(): void; // Foreclosure functionality (implemented in subclasses)
}

// HomeLoan implements LoanPayment correctly, fulfilling both doPayment and foreCloseLoan contracts.
export class HomeLoan implements LoanPayment{
  doPayment(): void {
    console.log("Making home loan payment");
  }

  foreCloseLoan(): void {
    console.log("Foreclosing home loan payment");
  }
}

// CreditCardLoan implements LoanPayment but provides a broken implementation for foreCloseLoan.
// This violates LSP because a valid LoanPayment object is expected to have a functional foreCloseLoan method,
// but CreditCardLoan throws an error, making it an improper replacement for LoanPayment.
export class CreditCardLoan implements LoanPayment{
  doPayment(): void {
    console.log("Making Credit card loan payment");
  }

  // The foreCloseLoan method is not implemented here and throws an error.
  // This breaks the contract expected from the LoanPayment interface, violating LSP.
  foreCloseLoan(): void {
    throw new Error("Method not implemented.");
  }
}

// LoanClosureService expects a LoanPayment object that correctly implements both methods (doPayment and foreCloseLoan).
// This service will break if passed a CreditCardLoan object because it expects a fully functional implementation of foreCloseLoan.
class LoanClosureService {
  private loanPayment: LoanPayment;

  constructor(loanPayment: LoanPayment) {
    this.loanPayment = loanPayment;
  }

  closeLoan() {
    this.loanPayment.foreCloseLoan(); // If foreCloseLoan is not implemented, it will throw an error in CreditCardLoan.
  }
}

// main code
const homeLoan : LoanPayment = new HomeLoan();
const creditCardLoan : LoanPayment = new CreditCardLoan();

const homeLoanClosure = new LoanClosureService(homeLoan);
const creditLoanClosure = new LoanClosureService(creditCardLoan);

// The LoanClosureService works as expected with homeLoan, but will throw an error for creditCardLoan
homeLoanClosure.closeLoan(); // Output: Foreclosing home loan payment
creditLoanClosure.closeLoan(); // Error: Method not implemented.