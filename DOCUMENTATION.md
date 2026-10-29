# 📚 NamasteStay — Technical Documentation

> Complete technical documentation for the NamasteStay full-stack accommodation listing application.

---

# 1. Project Overview

NamasteStay is a full-stack accommodation listing platform built using the Node.js ecosystem.

The application allows users to interact with accommodation listings and reviews while providing authenticated users with protected operations for managing their own resources.

The project focuses on implementing real-world backend concepts such as:

- MVC architecture
- RESTful routing
- CRUD operations
- Authentication
- Authorization
- Session management
- MongoDB data modeling
- Server-side validation
- Middleware
- Image upload
- Cloudinary integration
- Error handling
- Server-side rendering

---

# 2. Problem Statement

Traditional accommodation listing platforms require users to browse property information, view details, and interact with property owners or other users.

NamasteStay demonstrates how such a platform can be implemented as a full-stack web application with:

- User authentication
- Property listing management
- Image handling
- Reviews and ratings
- Ownership-based authorization
- Persistent database storage

The primary objective of the project is to understand how different backend and frontend components work together to build a complete web application.

---

# 3. Application Architecture

NamasteStay follows the **MVC (Model-View-Controller)** architecture.

```text
                         USER
                          │
                          ▼
                    ┌───────────┐
                    │  Browser  │
                    └─────┬─────┘
                          │
                          ▼
                    ┌───────────┐
                    │   Routes  │
                    └─────┬─────┘
                          │
                          ▼
                    ┌───────────┐
                    │Middleware │
                    └─────┬─────┘
                          │
                          ▼
                    ┌───────────┐
                    │Controller │
                    └─────┬─────┘
                          │
              ┌───────────┴───────────┐
              ▼                       ▼
        ┌───────────┐           ┌───────────┐
        │   Model   │           │    View   │
        └─────┬─────┘           └───────────┘
              │
              ▼
        ┌───────────┐
        │  MongoDB  │
        └───────────┘
```

### Responsibilities

| Component | Responsibility |
|---|---|
| Routes | Defines application endpoints |
| Middleware | Authentication, authorization, validation, error handling |
| Controllers | Contains application/business logic |
| Models | Defines database structure and operations |
| Views | Generates HTML using EJS |
| MongoDB | Persistent data storage |
| Cloudinary | Image storage |

---

# 4. Technology Stack

## Backend

### Node.js

Node.js provides the runtime environment for executing JavaScript on the server.

### Express.js

Express handles:

- Routing
- Middleware
- HTTP requests
- Responses
- Error handling

---

# 5. Frontend

The application uses server-side rendering rather than a separate React frontend.

### EJS

EJS is responsible for dynamically generating HTML pages using server-side data.

### Bootstrap

Bootstrap is used to create a responsive and consistent user interface.

### JavaScript

Client-side JavaScript provides additional browser-side interactions.

---

# 6. Database

NamasteStay uses:

```text
MongoDB
   │
   ▼
Mongoose
   │
   ▼
Node.js Application
```

MongoDB stores application data while Mongoose provides schema-based modeling and database interaction.

---

# 7. Data Models

The primary models are:

```text
User
Listing
Review
```

---

## 7.1 User Model

The User model represents registered users.

The authentication system uses Passport for local authentication.

Users can:

- Create an account
- Login
- Logout
- Create listings
- Manage authorized resources
- Add reviews

---

## 7.2 Listing Model

A listing represents an accommodation/property.

A listing contains information such as:

- Title
- Description
- Price
- Location
- Country
- Images
- Owner

Listings are associated with their owner.

```text
User
  │
  │ owns
  ▼
Listing
```

---

## 7.3 Review Model

Reviews represent user feedback associated with listings.

A review contains:

- Rating
- Comment
- Author
- Associated listing

Relationship:

```text
User ──────► Review ◄────── Listing
```

---

# 8. Authentication

Authentication is implemented using **Passport.js**.

The application supports:

```text
Signup
Login
Logout
```

Authentication allows the application to identify the currently logged-in user.

---

## Authentication Flow

```text
              SIGNUP
                 │
                 ▼
          Create User
                 │
                 ▼
          Store User Data
                 │
                 ▼
               LOGIN
                 │
                 ▼
        Passport Authentication
                 │
                 ▼
              Session
                 │
                 ▼
       Authenticated Requests
```

---

# 9. Authorization

Authentication and authorization are different concepts.

### Authentication

Answers:

> "Who is the user?"

### Authorization

Answers:

> "Is this user allowed to perform this operation?"

For example:

```text
User A
   │
   ▼
Owns Listing A
   │
   ├── Edit Listing A ✓
   └── Delete Listing A ✓

User B
   │
   ▼
Does NOT own Listing A
   │
   ├── Edit Listing A ✗
   └── Delete Listing A ✗
```

This ownership check protects resources from unauthorized modifications.

---

# 10. Session Management

The application uses:

- `express-session`
- `connect-mongo`

The session allows the application to remember authenticated users across requests.

MongoDB is used as the session store rather than relying only on in-memory session storage.

---

# 11. Middleware

Middleware is used to process requests before they reach the final controller.

Typical middleware responsibilities include:

```text
Request
   │
   ▼
Authentication
   │
   ▼
Authorization
   │
   ▼
Validation
   │
   ▼
Controller
```

Middleware helps avoid duplicating the same logic across multiple routes.

---

# 12. Validation

Server-side validation is implemented using **Joi**.

Validation helps prevent invalid data from being inserted into the database.

Example flow:

```text
Client Request
      │
      ▼
Joi Validation
      │
 ┌────┴────┐
 ▼         ▼
Valid     Invalid
 │          │
 ▼          ▼
Controller Error
```

Validation is especially important for listing and review data.

---

# 13. CRUD Operations

NamasteStay implements the standard CRUD operations.

### Create

Create a new listing.

```text
POST
```

### Read

Display listings and individual listing details.

```text
GET
```

### Update

Modify an existing listing.

```text
PUT
```

### Delete

Remove a listing or review.

```text
DELETE
```

---

# 14. Listing Workflow

The listing lifecycle can be represented as:

```text
Create
  │
  ▼
Store in MongoDB
  │
  ▼
Display Listing
  │
  ├──────► Edit
  │          │
  │          ▼
  │       Update
  │
  └──────► Delete
```

Before update or delete operations, authorization checks ensure the current user has permission.

---

# 15. Review Workflow

A review is associated with both:

- A user
- A listing

```text
             User
               │
               ▼
            Review
               │
               ▼
            Listing
```

Users can submit reviews for listings, while protected operations control review deletion.

---

# 16. Image Upload Architecture

NamasteStay uses:

- Multer
- Cloudinary

for image management.

### Upload Flow

```text
User
 │
 │ Select Image
 ▼
Multer
 │
 │ Process Upload
 ▼
Cloudinary
 │
 │ Image URL
 ▼
Listing
 │
 ▼
MongoDB
```

Cloudinary handles cloud-based image storage while MongoDB stores the relevant image information associated with the listing.

---

# 17. Error Handling

The application uses centralized error handling to provide consistent responses when something goes wrong.

Typical error scenarios include:

- Invalid listing ID
- Invalid form data
- Unauthorized request
- Resource not found
- Database errors
- Invalid route

The application can redirect users to an appropriate error page rather than exposing internal server details.

---

# 18. Flash Messages

Flash messages provide feedback after operations.

Examples:

```text
Listing created successfully
Listing updated successfully
Review added successfully
You must be logged in
You are not authorized
```

This improves the user experience by clearly communicating the result of an operation.

---

# 19. Project Structure

```text
NamasteStay/
│
├── controllers/
│   ├── listing.js
│   └── reviews.js
│
├── init/
│
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── public/
│   ├── css/
│   └── js/
│
├── routes/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── utils/
│
├── views/
│   ├── layouts/
│   ├── listings/
│   ├── users/
│   └── includes/
│
├── app.js
├── cloudConfig.js
├── middleware.js
├── schema.js
├── package.json
├── package-lock.json
└── .gitignore
```

---

# 20. Important Files

## `app.js`

Main application entry point.

Responsible for:

- Creating the Express application
- Configuring middleware
- Connecting to MongoDB
- Configuring sessions
- Registering routes
- Configuring error handling

---

## `middleware.js`

Contains custom middleware used for:

- Authentication checks
- Authorization
- Resource ownership checks
- Other reusable request processing

---

## `schema.js`

Contains Joi validation schemas used to validate incoming application data.

---

## `cloudConfig.js`

Contains Cloudinary configuration required for image uploads.

---

# 21. Route Organization

Routes are separated according to application resources.

```text
routes/
│
├── listing.js
├── review.js
└── user.js
```

This keeps the routing layer modular.

---

## Listing Routes

Responsible for:

- Listing creation
- Listing retrieval
- Listing update
- Listing deletion

General REST pattern:

```text
GET     /listings
GET     /listings/:id
POST    /listings
GET     /listings/:id/edit
PUT     /listings/:id
DELETE  /listings/:id
```

---

## User Routes

Responsible for authentication:

```text
GET     /signup
POST    /signup

GET     /login
POST    /login

GET     /logout
```

---

## Review Routes

Responsible for review operations:

```text
POST    /listings/:id/reviews
DELETE  /listings/:id/reviews/:reviewId
```

---

# 22. Request Lifecycle

A typical request passes through multiple layers.

```text
Browser
   │
   ▼
Express Route
   │
   ▼
Middleware
   │
   ├── Authentication
   ├── Authorization
   └── Validation
   │
   ▼
Controller
   │
   ▼
Model
   │
   ▼
MongoDB
   │
   ▼
Controller
   │
   ▼
EJS View
   │
   ▼
Browser
```

This layered structure improves maintainability and separation of concerns.

---

# 23. Environment Configuration

The application uses environment variables for sensitive configuration.

Required variables include:

```env
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

### Why Environment Variables?

Sensitive credentials should not be hardcoded into source code.

```text
Source Code
     │
     ├── Public / Safe
     │
     └── Environment Variables
              │
              ├── Database Credentials
              ├── Session Secret
              └── Cloudinary Credentials
```

---

# 24. Local Development Setup

### Step 1

Clone the repository.

```bash
git clone https://github.com/NitinSingh1982/NamasteStay.git
```

### Step 2

Install dependencies.

```bash
npm install
```

### Step 3

Configure `.env`.

### Step 4

Start the server.

```bash
node app.js
```

---

# 25. Security Considerations

The application follows several basic security practices:

- Authentication before protected operations
- Authorization based on resource ownership
- Environment variables for secrets
- Server-side validation
- Session-based authentication
- Centralized error handling

Future security improvements can include:

- CSRF protection
- Rate limiting
- HTTP security headers
- Stronger input sanitization
- More extensive automated testing

---

# 26. Testing Checklist

Before deployment, verify:

### Authentication

- [ ] Signup works
- [ ] Login works
- [ ] Logout works
- [ ] Invalid credentials are rejected

### Listings

- [ ] Create listing
- [ ] View listing
- [ ] Edit listing
- [ ] Delete listing
- [ ] Unauthorized modification is blocked

### Reviews

- [ ] Add review
- [ ] Delete authorized review
- [ ] Invalid review data is rejected

### Images

- [ ] Image upload works
- [ ] Cloudinary upload works
- [ ] Image URL is stored correctly

### Validation

- [ ] Invalid listing data is rejected
- [ ] Invalid review data is rejected

---

# 27. Engineering Concepts Demonstrated

The project demonstrates practical understanding of:

### Backend

- Node.js
- Express.js
- RESTful routing
- Middleware
- MVC architecture

### Database

- MongoDB
- Mongoose
- Schema design
- Relationships
- CRUD operations

### Authentication

- Passport.js
- Sessions
- Authentication
- Authorization
- Ownership checks

### Cloud

- Cloudinary
- Image uploads
- External service integration

### Software Engineering

- Separation of concerns
- Modular folder structure
- Environment configuration
- Validation
- Error handling
- Git/GitHub

---

# 28. Interview Discussion Points

This project can be used to discuss several important technical concepts during an interview.

## Question 1: Why did you use MVC?

**Answer:**

I used MVC to separate the application into different responsibilities. Models handle database operations, controllers contain business logic, and views handle presentation. This makes the codebase easier to maintain and extend.

---

## Question 2: Why MongoDB?

**Answer:**

MongoDB is a document-oriented NoSQL database that works well with JavaScript-based applications. Mongoose also provides schema modeling and simplifies database interaction from Node.js.

---

## Question 3: Authentication vs Authorization?

**Answer:**

Authentication verifies the identity of a user, while authorization determines whether the authenticated user has permission to perform a particular operation.

---

## Question 4: Why use middleware?

**Answer:**

Middleware allows common request-processing logic such as authentication, authorization, validation, and error handling to be reused across multiple routes instead of duplicating the same logic.

---

## Question 5: Why Cloudinary?

**Answer:**

Cloudinary provides cloud-based image storage and delivery. It avoids depending on local server storage and makes handling uploaded media easier for a web application.

---

## Question 6: Why use sessions?

**Answer:**

HTTP is stateless, so sessions allow the server to maintain information about an authenticated user across multiple requests.

---

## Question 7: Why validate data on the server?

**Answer:**

Client-side validation can be bypassed, so server-side validation is necessary to ensure that only valid data reaches the application's business logic and database.

---

# 29. Possible Future Improvements

The current architecture can be extended with:

### Booking System

Allow users to reserve accommodations for specific dates.

### Payment Integration

Integrate a payment gateway for online transactions.

### Search & Filtering

Add:

- Location filtering
- Price range
- Rating
- Property type

### Maps

Display property locations using a map service.

### Wishlist

Allow users to save favorite properties.

### Admin Dashboard

Add administrative functionality for:

- User management
- Listing moderation
- Review moderation
- Platform statistics

---

# 30. Learning Outcomes

Through this project, I gained practical experience in building and structuring a full-stack web application.

### Technical Learning

- Backend development with Node.js and Express
- RESTful API design
- MVC architecture
- MongoDB and Mongoose
- Authentication and authorization
- Session management
- Server-side validation
- Cloudinary integration
- Error handling
- Git/GitHub workflow

### Software Engineering Learning

The project helped me understand how individual components such as routes, controllers, models, middleware, databases, and views work together to form a complete application.

---

# 31. Conclusion

NamasteStay demonstrates the implementation of a structured full-stack web application using the Node.js ecosystem.

The project focuses not only on building UI functionality but also on understanding:

```text
Architecture
     ↓
Routing
     ↓
Middleware
     ↓
Authentication
     ↓
Authorization
     ↓
Business Logic
     ↓
Database
     ↓
Cloud Services
     ↓
Server-Side Rendering
```

This architecture provides a foundation that can be extended into a more complete accommodation and booking platform.

---

# 🔗 Repository

**GitHub:**  
https://github.com/NitinSingh1982/NamasteStay

---

## 👨‍💻 Author

**Nitin Singh**

B.Tech — Computer Science & Engineering (AI & ML)

> Full-Stack Development • Backend Development • Java & DSA • AI/ML