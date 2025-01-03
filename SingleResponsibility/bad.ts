export class UserManager {
  private users: { id: number; name: string }[] = [];

  // This method is responsible for adding users, which is a core responsibility of managing user data.
  addUser(user: { id: number; name: string }): void {
    this.users.push(user);
    console.log(`User ${user.name} added successfully.`);
  }

  // This method is responsible for removing users, which is another core responsibility of managing user data.
  removeUser(id: number): void {
    this.users = this.users.filter(user => user.id !== id);
    console.log(`User with ID ${id} removed.`);
  }

  // This method introduces an entirely separate responsibility: user authentication.
  // By including it here, the class now has two reasons to change:
  // 1. Changes in user management logic (add/remove functionality).
  // 2. Changes in authentication logic (e.g., modifying how authentication is handled).
  authenticateUser(id: number, name: string): boolean {
    const user = this.users.find(user => user.id === id && user.name === name);
    if (user) {
      console.log(`User ${name} authenticated successfully.`);
      return true;
    }
    console.log(`Authentication failed for ${name}.`);
    return false;
  }
}

// Why is this bad?
// - Violates SRP: The class handles two distinct responsibilities: 
//   1. Managing user data (addUser, removeUser).
//   2. Authenticating users (authenticateUser).
// - High Coupling: If the authentication mechanism changes, you have to modify this class, 
//   even though user management itself hasn't changed.
// - Reduced Reusability: Separating authentication logic into its own class would allow other parts of the system
//   to reuse the authentication functionality independently of user management.