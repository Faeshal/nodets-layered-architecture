🥇 TypeScript Service Layer Architecture REST API Boilerplate with **[TypeORM](https://typeorm.io)** ORM

![img](https://i.postimg.cc/Hkffrzb4/img.jpg)

🌴 Looking for the **JS** version? **[nodejs-layered-architecture](https://github.com/Faeshal/nodejs-layered-architecture)**

❓ Express.js is an **unopinionated** framework — developers are free to structure their projects however they like, unlike opinionated frameworks such as Laravel or Spring Boot. While this flexibility is powerful, it can make it hard to find a consistent best practice. This boilerplate is the structure I personally use as a starting point for backend projects. I call it **Service Layer Architecture**.

💡 There are 3 main layers:

1. Controller layer (request handler) 🌐

   This is where API routes are defined. Route handlers deconstruct the request object, extract the necessary data, and pass it down to the service layer for processing. No business logic lives here.

2. Service layer (business logic) 🚀

   This is where the core logic of your application lives. It contains methods that follow SOLID principles — single responsibility, reusable, and fully decoupled from the HTTP layer.

3. Data Access Layer / Repository (database interaction) 🛡️

   All database operations are handled here — queries, connections, and ORM models. Keeping this layer separate makes it easy to swap databases or ORMs without touching business logic.

This three-layer setup provides a reliable foundation for most Node.js applications, making the codebase easier to develop, maintain, debug, and test.

🗡 **2023 - 2026 · [Faeshal](https://github.com/faeshal)**
