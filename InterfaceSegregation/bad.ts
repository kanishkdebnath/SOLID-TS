// Violation of Interface Segregation Principle (ISP)
// The LoanProcessor interface is too broad and forces classes to implement methods they do not need.

// LoanProcessor interface with multiple unrelated methods
interface LoanProcessor {
  applyLoan(): void;
  approveLoan(): void;
  processPayment(): void;
  sendNotification(): void;  // CarLoan may not need this method, but it is forced to implement it.
}

// PersonalLoan class implements all methods, but some of them might not be relevant in other loan types.
export class PersonalLoan implements LoanProcessor {
  applyLoan(): void {
    console.log("Applying for a personal loan.");
  }

  approveLoan(): void {
    console.log("Approving personal loan.");
  }

  processPayment(): void {
    console.log("Processing personal loan payment.");
  }

  sendNotification(): void {
    console.log("Sending notification for personal loan.");
  }
}

// BusinessLoan class implements all methods, but some might not be needed by other loan types.
class BusinessLoan implements LoanProcessor {
  applyLoan(): void {
    console.log("Applying for a business loan.");
  }

  approveLoan(): void {
    console.log("Approving business loan.");
  }

  processPayment(): void {
    console.log("Processing business loan payment.");
  }

  sendNotification(): void {
    console.log("Sending notification for business loan.");
  }
}

// CarLoan class implements all methods, even though it doesn't need `sendNotification`.
class CarLoan implements LoanProcessor {
  applyLoan(): void {
    console.log("Applying for a car loan.");
  }

  approveLoan(): void {
    console.log("Approving car loan.");
  }

  processPayment(): void {
    console.log("Processing car loan payment.");
  }

  // CarLoan does not need sendNotification, but it is forced to implement this due to the large interface.
  sendNotification(): void {
    console.log("Sending notification for car loan.");
  }
}

// main code
const personalLoan: LoanProcessor = new PersonalLoan();
personalLoan.sendNotification();  // PersonalLoan uses the sendNotification method, which it needs.

const businessLoan: LoanProcessor = new BusinessLoan();
businessLoan.sendNotification();  // BusinessLoan uses the sendNotification method, which it needs.

const carLoan: LoanProcessor = new CarLoan();
carLoan.sendNotification();  // CarLoan does not need this, but is forced to implement it because of the large interface.