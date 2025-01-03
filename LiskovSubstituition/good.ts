// Liskov Substitution Principle (LSP)
// Subtypes must be substitutable for their base types without altering the correctness of the program.

// The LoanPayment interface defines a contract for making payments, but it doesn't force subclasses to implement foreclosure functionality.
interface LoanPayment {
  doPayment(): void;
}

// The SecureLoan interface extends LoanPayment and adds the foreCloseLoan method. 
// This is a specialized interface that only applies to loans that support foreclosure functionality.
interface SecureLoan extends LoanPayment{
  foreCloseLoan(): void;
}

// The HomeLoan class implements the SecureLoan interface. 
// It provides implementations for both doPayment and foreCloseLoan, 
// thus fulfilling the contract of both the LoanPayment and SecureLoan interfaces.
class HomeLoan implements SecureLoan{
  doPayment(): void {
    console.log("Making home loan payment");
  }

  foreCloseLoan(): void {
    console.log("Foreclosing home loan payment");
  }
}

// The CreditCardLoan class only implements LoanPayment, meaning it does not need to support foreclosure functionality.
// This is fine because CreditCardLoan does not need to implement foreCloseLoan, as it does not involve foreclosure. 
// This class adheres to the LoanPayment contract but does not need to be concerned with foreclosure operations.
class CreditCardLoan implements LoanPayment{
  doPayment(): void {
    console.log("Making Credit card loan payment");
  }
}

// LoanClosureService expects a SecureLoan (which guarantees foreCloseLoan implementation).
// This ensures that any loan passed to LoanClosureService will have foreclosure functionality.
class LoanClosureService {
  private loanPayment: SecureLoan;

  constructor(loanPayment: SecureLoan) {
    this.loanPayment = loanPayment;
  }

  closeLoan() {
    this.loanPayment.foreCloseLoan(); // Calls the foreCloseLoan method safely, knowing that the loan has this functionality.
  }
}

// main code

// HomeLoan is passed as a SecureLoan because it implements both doPayment and foreCloseLoan.
const homeLoan : SecureLoan = new HomeLoan();
const homeLoanClosure = new LoanClosureService(homeLoan);
homeLoanClosure.closeLoan(); // Works correctly, as HomeLoan supports foreclosure functionality.

// This no longer allowed, which is good because CreditCardLoan doesn't support foreclosure functionality (LSP violation fixed).
// const creditLoanClosure = new LoanClosureService(creditCardLoan);
// creditLoanClosure.closeLoan(); // This would throw a compile-time error, as CreditCardLoan does not implement foreCloseLoan.