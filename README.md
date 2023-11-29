# Advance CRUD Backend Using TypeScript, Node (Express), MongoDB (Mongoose) & Joi

**Description:** This a Node.js Express application with TypeScript as the programming language, integrating MongoDB with Mongoose for user data and order management. Data integrity is ensured through validation using Joi.

##

**API URL:** https://advance-crud.vercel.app

##

### Data Types List

- `userId` (number): A unique identifier for the user.
- `username` (string): Denotes the user's unique username, ensuring uniqueness across the system.
- `password` (string): Represents the user's password. The password is securely stored in hashed form, utilizing the bcrypt algorithm for hashing.
- `fullName` (object): An object containing the first and last name of the user.
  - `firstName` (string): The first name of the user.
  - `lastName` (string): The last name of the user.
- `age` (number): The age of the user.
- `email` (string): The email address of the user.
- `isActive` (boolean): A flag indicating whether the user is active or not.
- `hobbies` (array of strings): An array containing the hobbies of the user.
- `address` (object): An object containing the street, city, and country of the user's address.
  - `street` (string): The street of the user's address.
  - `city` (string): The city of the user's address.
  - `country` (string): The country of the user's address.
- `orders` (array of objects): An array containing the orders of the user.
  - `productName` (string): The name of the product in the order.
  - `price` (number): The price of the product in the order.
  - `quantity` (number): The quantity of the product in the order.

## 1. User Management

##### Get All User:

- Endpoint: **POST /api/users**
- Request: **POST https://advance-crud.vercel.app/api/users**
- Request Body:

```json
{
    "userId": 11111,
    "username": "5i111",
    "password": "1c3161s",
    "fullName": {
      "firstName": "Jmesh",
      "lastName": "Smith"
    },
    "age": 32,
    "email": "1111@gi.com",
    "isActive": true,
    "hobbies": ["photography", "cooking"],
    "address": {
      "street": "456 Oak Ave",
      "city": "Bigtown",
      "country": "USA"
    },
    "orders": [
      {
        "productName": "Product 13",
        "price": 10.99,
        "quantity": 3
      },
      {
        "productName": "Product 14",
        "price": 25.5,
        "quantity": 1
      }
    ]
}
```

- Response: Newly created user object. **The password field is not included in the response data for security purpose.**

```json
{
  "success": true,
  "message": "User created successfully!",
  "data": {
    "userId": 11111,
    "username": "5i111",
    "fullName": {
      "firstName": "Jmesh",
      "lastName": "Smith",
      "_id": "656106096f01c456c08505b0"
    },
    "age": 32,
    "email": "1111@gi.com",
    "isActive": true,
    "hobbies": ["photography", "cooking"],
    "address": {
      "street": "456 Oak Ave",
      "city": "Bigtown",
      "country": "USA",
      "_id": "656106096f01c456c08505b1"
    },
    "__v": 0
  }
}
```

- Invalid request with wrong firstName format:

```json
{
        "userId": 198313011,
        "username": "khan1sr3ait11dul",
        "password": "khatf1n11323",
        "fullName": {
            "firstName": "SaidulSaidulSaidulSaidulSaidulSaidulSaidulSaidulSaidulSaidulSaidul",
            "lastName": "Smith"
        },
        "age": 32,
        "email": "khan.s1a3id1ul1@gmail.com",
        "isActive": true,
        "hobbies": [
            "photography",
            "cooking"
        ],
        "address": {
            "street": "456 Oak Ave",
            "city": "Bigtown",
            "country": "USA"
        },
        "orders": [
            {
                "productName": "Product 13",
                "price": 10.99,
                "quantity": 3
            },
            {
                "productName": "Product 14",
                "price": 25.50,
                "quantity": 1
            }
        ]
}
```
- Error Response:

```json
{
    "success": false,
    "message": "Something went wrong!",
    "error": {
        "code": 500,
        "description": "First name cannot be more than 20 characters"
    }
}
```

### 2. Retrieve a list of all users

- Endpoint: **GET /api/users**
- Request: **GET https://advance-crud.vercel.app/api/users**
- Response: List of user objects. Each object only contain `username`, `fullName`, `age`, `email`, `address` .

```json
{
  "success": true,
  "message": "Users fetched successfully!",
  "data": [
    {
      "username": "john_doe",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "age": 30,
      "email": "saidul@gmail.com",
      "address": {
        "street": "123 Main St",
        "city": "Anytown",
        "country": "USA"
      }
    }
    // more objects...
  ]
}
```

### 3. Retrieve a specific user by ID

- Endpoint: **GET /api/users/:userId**

- Request: **GET https://advance-crud.vercel.app/api/users/1**

- Response: With this endpoint we can fetch specific user object by providing user id in url. The password field is not included in the response data.

```json
{
  "success": true,
  "message": "User is fetched successfully",
  "data": {
    "userId": 1,
    "username": "john_doe",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "age": 30,
    "email": "saidul@gmail.com",
    "isActive": true,
    "hobbies": ["reading", "traveling"],
    "address": {
      "street": "123 Main St",
      "city": "Anytown",
      "country": "USA"
    }
  }
}
```

- Invalid Request: **PUT https://advance-crud.vercel.app/api/users/100**
- Error Response:

```json
{
  "success": false,
  "message": "User not found",
  "error": {
    "code": 404,
    "description": "User not found!"
  }
}
```

### 4. Update user information

- Endpoint: **PUT /api/users/:userId**

- Request: **PUT https://advance-crud.vercel.app/api/users/1**
- Request Body:

```json
{
  "user": { "email": "khansaab@gmail.com" }
}
```

- Response: With this endpoint we can update user object by providing user id in url. The password field is not included in the response data.

```json
{
  "success": true,
  "message": "User updated successfully!",
  "data": {
    "userId": 1,
    "username": "john_doe",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "age": 30,
    "email": "khansaab@gmail.com",
    "isActive": true,
    "hobbies": ["reading", "traveling"],
    "address": {
      "street": "123 Main St",
      "city": "Anytown",
      "country": "USA"
    }
  }
}
```

- Invalid Request: **PUT https://advance-crud.vercel.app/api/users/100**
- Error Response:

```json
{
  "success": false,
  "message": "User not found",
  "error": {
    "code": 404,
    "description": "User not found!"
  }
}
```

- Invalid request with wrong email format:

```json
{
  "user": { "email": "khansaabgmail.com" }
}
```
- Error Response:

```json
{
    "success": false,
    "message": "Something went wrong!",
    "error": {
        "code": 500,
        "description": "Email must be in a valid format"
    }
}
```

### 5. Delete a user

- Endpoint: **DELETE /api/users/:userId**
- Request: **DELETE https://advance-crud.vercel.app/api/users/1**

- Response: This endpoint used to delete any existing user from the list.

```json
{
  "success": true,
  "message": "User deleted successfully!",
  "data": null
}
```

- Invalid Request: **DELETE https://advance-crud.vercel.app/api/users/100**
- Error Response:

```json
{
  "success": false,
  "message": "User not found",
  "error": {
    "code": 404,
    "description": "User not found!"
  }
}
```

## Order Management:

### 1. Add New Product in Order

- Endpoint: **PUT /api/users/:userId/orders**

- Request: **PUT https://advance-crud.vercel.app/api/users/5/orders**
- Request Body:

```json
{
  "orders": {
    "productName": "Product 15",
    "price": 65.99,
    "quantity": 9
  }
  // more objects...
}
```

- If the 'orders' property already exists for a user, it will append a new product to 'orders' array. Otherwise, it will create an 'orders' array within the user object and then add the order data.

- Response:

```json
{
  "success": true,
  "message": "Order created successfully!",
  "data": null
}
```

- Invalid Request: **PUT https://advance-crud.vercel.app/api/users/100/orders**
- Error Response:

```json
{
  "success": false,
  "message": "User not found",
  "error": {
    "code": 404,
    "description": "User not found!"
  }
}
```

### 2. Retrieve all orders for a specific user

- Endpoint: **GET /api/users/:userId/orders**
- Request: **GET https://advance-crud.vercel.app/api/users/5/orders**
- Response:

```json
{
  "success": true,
  "message": "Orders fetched successfully!",
  "data": [
    {
      "orders": [
        {
          "productName": "Product 10",
          "price": 39.99,
          "quantity": 3,
          "_id": "65608dd1752b7ea635b62fc9"
        },
        {
          "productName": "Product 15",
          "price": 65.99,
          "quantity": 9,
          "_id": "65611d7571fc12d5d6b4e3d0"
        }
      ]
    }
  ]
}
```

- This endpoint will give us the list of order objects for the specified user.

- Invalid Request: **GET https://advance-crud.vercel.app/api/users/500/orders**
- Error Response:

```json
{
  "success": false,
  "message": "User not found",
  "error": {
    "code": 404,
    "description": "User not found!"
  }
}
```
