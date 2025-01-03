// Interface Segregation Principle (ISP)
// A class should not be forced to implement interfaces it does not use.
// Interface violating ISP: Clients are forced to implement methods they do not need.

// Basic LoanProcessor interface: includes only core methods that every loan type needs to implement.
interface LoanProcessor {
  applyLoan(): void;
  approveLoan(): void;
  processPayment(): void;
}

// LoanProcessorWithNotification extends LoanProcessor to include the sendNotification method
// Only classes that require notification functionality will implement this interface.
interface LoanProcessorWithNotification extends LoanProcessor {
  sendNotification(): void;
}

// PersonalLoan implements LoanProcessorWithNotification because it needs to handle loan notifications.
class PersonalLoan implements LoanProcessorWithNotification {
  applyLoan(): void {
    console.log("Applying for a personal loan.");
  }

  approveLoan(): void {
    console.log("Approving personal loan.");
  }

  processPayment(): void {
    console.log("Processing personal loan payment.");
  }

  // PersonalLoan implements sendNotification as it requires notifications.
  sendNotification(): void {
    console.log("Sending notification for personal loan.");
  }
}

// BusinessLoan implements LoanProcessorWithNotification, since it also needs notification functionality.
class BusinessLoan implements LoanProcessorWithNotification {
  applyLoan(): void {
    console.log("Applying for a business loan.");
  }

  approveLoan(): void {
    console.log("Approving business loan.");
  }

  processPayment(): void {
    console.log("Processing business loan payment.");
  }

  // BusinessLoan implements sendNotification as it requires notifications.
  sendNotification(): void {
    console.log("Sending notification for business loan.");
  }
}

// CarLoan implements only the base LoanProcessor interface, as it doesn't need notifications.
// This class doesn't implement sendNotification, avoiding unnecessary methods.
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
}

// main code
// PersonalLoan requires notification functionality, so it implements LoanProcessorWithNotification.
const personalLoan: LoanProcessorWithNotification = new PersonalLoan();
personalLoan.sendNotification();  // PersonalLoan can send notifications.

// BusinessLoan also requires notification functionality, so it implements LoanProcessorWithNotification.
const businessLoan: LoanProcessorWithNotification = new BusinessLoan();
businessLoan.sendNotification();  // BusinessLoan can send notifications.

// CarLoan does not need notifications, so it only implements LoanProcessor.
// This class does not implement sendNotification, which is correct as per ISP.
const carLoan: LoanProcessor = new CarLoan();
// This will not be allowed anymore
// carLoan.sendNotification();   // carLoan does not have sendNotification method, following ISP.