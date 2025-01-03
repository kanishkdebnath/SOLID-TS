// Dependency Inversion Principle (DIP)
// High-level modules should not depend on low-level modules. Both should depend on abstractions.

interface Database {
  name: string;
  connect(): void;  // The high-level UserService does not know the details of the DB connection.
}

// Concrete database implementations implement the Database interface.
// By implementing the interface, these classes provide flexibility in choosing which database to use.
class SqlDB implements Database {
  name: string = "SQL";
  connect(): void {
    console.log("Connecting SQL database.");
  } 
}

class NoSqlDB implements Database {
  name: string = "NoSQL";
  connect(): void {
    console.log("Connecting NoSQL database.");
  } 
}

class H2DB implements Database {
  name: string = "H2";
  connect(): void {
    console.log("Connecting H2 in-memory database.");
  } 
}

// UserService no longer depends on a specific database implementation.
// It instead depends on the Database abstraction, which allows flexibility in database selection.
class UserService {
  private database: Database;

  // Dependency Injection: The database dependency is injected via the constructor.
  // This way, UserService is decoupled from any specific database type.
  constructor(database: Database) {
    this.database = database;
  }

  saveUserData(data: string) {
    // UserService interacts with the Database abstraction instead of a concrete class.
    this.database.connect();
    console.log(`Saving user data : [${data}] to DB : [${this.database.name}]`);
  }
}

// Main code
// The UserService class can now easily work with different databases without being modified.
// The database can be substituted with any class that implements the Database interface.
const sqlDB = new SqlDB();
const noSqlDB = new NoSqlDB();
const h2DB = new H2DB();

// The database implementation can now be selected at runtime, without changing UserService.
let userService = new UserService(sqlDB);
userService.saveUserData("Kanishk");

userService = new UserService(noSqlDB);
userService.saveUserData("Kanishk");

userService = new UserService(h2DB);
userService.saveUserData("Kanishk");