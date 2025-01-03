// Dependency Inversion Principle (DIP)
// High-level modules should not depend on low-level modules. Both should depend on abstractions.

class Database {
  connect(): void {
    console.log("Connecting to database...");
  }
}

// Bad design: The UserService is tightly coupled to the Database class. 
// It directly creates an instance of Database, which means:
// 1. UserService cannot be reused with a different data source (e.g., a mock database or an in-memory database).
// 2. Modifying or changing the database implementation (e.g., switching to a NoSQL database) requires changes in the UserService class.
// This violates the DIP because the high-level UserService is dependent on a low-level module (Database), instead of an abstraction.

export class UserService {
  private database: Database;

  constructor() {
    // The UserService directly instantiates the Database class, causing tight coupling.
    // This means UserService depends on a specific implementation of the Database class, 
    // not on an abstraction or interface that would allow flexibility in choosing different database implementations.
    this.database = new Database();
  }

  saveUserData(userData: string): void {
    // The saveUserData method directly calls the database's connect method, 
    // making UserService dependent on the low-level implementation of the Database class.
    this.database.connect();
    console.log(`Saving user data: ${userData}`);
  }
}

// main code
// The high-level UserService depends directly on the low-level Database class,
// which makes it hard to test and extend with other data sources.
const userService = new UserService();
userService.saveUserData("John Doe");