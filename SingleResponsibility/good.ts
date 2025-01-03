// Single Responsibility Principle (SRP)
// A class should have one and only one reason to change, meaning it should have only one job or responsibility.

// The User class is solely responsible for encapsulating user data.
class User {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

// The UserManager class is responsible for managing user-related operations (add, remove, get users).
class UserManager {
  private users: User[] = [];

  // Adds a user to the list. This is part of the "user management" responsibility.
  addUser(user: User): void {
    this.users.push(user);
    console.log(`User ${user.name} added successfully.`);
  }

  // Removes a user from the list. Again, part of user management.
  removeUser(id: number): void {
    this.users = this.users.filter(user => user.id !== id);
    console.log(`User with ID ${id} removed.`);
  }

  // Retrieves the list of all users.
  getUsers(): User[] {
    return this.users;
  }
}

// The AuthenticationManager class is solely responsible for user authentication.
// It does not concern itself with how users are added, removed, or managed, adhering to SRP.
class AuthenticationManager {
  authenticateUser(id: number, name: string, users: User[]): boolean {
    const user = users.find(user => user.id === id && user.name === name);
    if (user) {
      console.log(`User ${name} authenticated successfully.`);
      return true;
    }
    console.log(`Authentication failed for ${name}.`);
    return false;
  }
}

// main code: Demonstrating the separation of concerns and collaboration between classes
const user1 = new User(1, "Kanishk");
const user2 = new User(2, "Rohan");
const user3 = new User(3, "Karan");
const user4 = new User(4, "Vishnu");

// UserManager is responsible for user CRUD operations.
const userManager: UserManager = new UserManager();
userManager.addUser(user1);
userManager.addUser(user2);
userManager.addUser(user3);
userManager.addUser(user4);

// AuthenticationManager handles user authentication logic independently of user management.
const authenticationManager: AuthenticationManager = new AuthenticationManager();

// Authentication operations work on the user data retrieved from UserManager.
authenticationManager.authenticateUser(1, "Kanishk", userManager.getUsers());
authenticationManager.authenticateUser(3, "Rohan", userManager.getUsers());

// UserManager handles user removal.
userManager.removeUser(1);

// Authentication now fails because the user has been removed.
authenticationManager.authenticateUser(1, "Kanishk", userManager.getUsers());