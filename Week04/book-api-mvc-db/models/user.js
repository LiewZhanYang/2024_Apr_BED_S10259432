const sql = require("mssql");
const dbConfig = require("../dbConfig");

class User {
  static async createUser(userData) {
    const connection = await sql.connect(dbConfig);

    try {
      const query = `
            INSERT INTO Users (username, email, password)
            OUTPUT INSERTED.*
            VALUES (@username, @useremail, @password)
          `;

      const request = connection.request();
      request.input("username", sql.VarChar, userData.username);
      request.input("useremail", sql.VarChar, userData.email);
      request.input("password", sql.VarChar, userData.password);

      const result = await request.query(query);
      return result.recordset[0];
    } catch (error) {
      throw new Error("Error creating user");
    } finally {
      await connection.close();
    }
  }

  static async getAllUsers() {
    const connection = await sql.connect(dbConfig);

    try {
      const query = "SELECT * FROM Users";
      const result = await connection.request().query(query);
      return result.recordset;
    } catch (error) {
      throw new Error("Error retrieving users");
    } finally {
      await connection.close();
    }
  }

  static async getUserById(userId) {
    const connection = await sql.connect(dbConfig);

    try {
      const query = "SELECT * FROM Users WHERE id = @id";
      const request = connection.request();
      request.input("id", sql.Int, userId);

      const result = await request.query(query);
      return result.recordset[0];
    } catch (error) {
      throw new Error("Error retrieving user");
    } finally {
      await connection.close();
    }
  }

  static async updateUser(userId, updatedData) {
    const connection = await sql.connect(dbConfig);

    try {
      const query = `
            UPDATE Users
            SET username = @username, email = @useremail, password = @password
            OUTPUT INSERTED.*
            WHERE id = @id
          `;

      const request = connection.request();
      request.input("id", sql.Int, userId);
      request.input("username", sql.VarChar, updatedData.username);
      request.input("useremail", sql.VarChar, updatedData.email);
      request.input("password", sql.VarChar, updatedData.password);

      const result = await request.query(query);
      return result.recordset[0];
    } catch (error) {
      throw new Error("Error updating user");
    } finally {
      await connection.close();
    }
  }

  static async deleteUser(userId) {
    const connection = await sql.connect(dbConfig);

    try {
      const query = `
            DELETE FROM Users
            WHERE id = @id
          `;

      const request = connection.request();
      request.input("id", sql.Int, userId);

      const result = await request.query(query);
      return result.rowsAffected[0] > 0;
    } catch (error) {
      throw new Error("Error deleting user");
    } finally {
      await connection.close();
    }
  }
  // ... existing properties and methods ...

  static async searchUsers(searchTerm) {
    const connection = await sql.connect(dbConfig);

    try {
      const query = `
        SELECT *
        FROM Users
        WHERE username LIKE '%${searchTerm}%'
          OR email LIKE '%${searchTerm}%'
      `;

      const result = await connection.request().query(query);
      return result.recordset;
    } catch (error) {
      throw new Error("Error searching users"); // Or handle error differently
    } finally {
      await connection.close(); // Close connection even on errors
    }
  }
}

module.exports = User;
