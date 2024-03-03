# Microservices with Node JS and React

## Section 1: How this project was created

```bash
# client/
npx create-react-app .

# posts/
npm init -y
npm install express axios cors
npm install nodemon --save-dev

# comments/
npm init -y
npm install express axios cors
npm install nodemon --save-dev

# event-bus/
npm init -y
npm install express axios cors
npm install nodemon --save-dev

# query service/
npm init -y
npm install express cors
npm install nodemon --save-dev
```

## Section 2: Tables of services

### Endpoints in Posts microservice

| Route  | Method | Body?             | Description    |
| ------ | ------ | ----------------- | -------------- |
| /posts | GET    |                   | List all posts |
| /posts | POST   | { title: string } | Create a post  |

#### Posts structure example

```json
{
  "65359f6b": {
    "id": "65359f6b",
    "title": "post 1"
  },
  "1d3c8513": {
    "id": "1d3c8513",
    "title": "post 2"
  }
}
```

### Endpoints in Comments microservice

| Route               | Method | Body?               | Description                              |
| ------------------- | ------ | ------------------- | ---------------------------------------- |
| /posts/:id/comments | GET    | -                   | List all comments associated with a post |
| /posts/:id/comments | POST   | { content: string } | Create a comment associated with a post  |

#### Comments by Post id structure example

```json
{
  "65359f6b": [
    {
      "id": "65359f6b",
      "content": "Example comment"
    },
    {
      "id": "1d3c8513",
      "content": "Example comment"
    }
  ],
  "2403faf1": []
}
```

Clarifications about this project:

- This microservices project was created to understand how to create a microservices architecture using Node.js and React.
- Maybe in real scenarios, post, comments, and query services stays in a single microservice. But in this project, we are using different microservices to understand how to communicate between them.
- About the event-bus, it was created to understand how to communicate between microservices using a single event-bus created in Node.js.
- About the moderation service, It was created because in some scenarios we are going to assume that this service may take a long time (minutes or maybe hours) to moderate a comment. more in link: [Readme.md](./moderation/README.md)

Moderation Features:

- If a comment contains the word "orange", moderate microservice it will be rejected.
- Comments will be validated by the moderation service when it is created.
- So, comments will be in "pending" status until the moderation service gives a response.
- If the moderation service approves the comment, it will be updated to "approved" status.
- If the moderation service rejects the comment, it will be updated to "rejected" status.

Moderation Feature clarifications:

Super easy to implement in the existing comment microservice, but in this project let's assume that the moderation service requires be a separate microservice.

We are going to assume that the moderation service may take a long time (minutes or maybe hours) to moderate a comment.

Event Types:

- commentCreated

| Event                         |
| ----------------------------- |
| type: CommentCreated          |
| data: { id, content, postId } |

- commentModerated

| Event                                 |
| ------------------------------------- |
| type: CommentModerated                |
| data: { id, content, postId, status } |

Option 1 to implement the moderation service:

- We create a moderation service that will be responsible for moderating comments.
- When user submits a comment, the "commentCreated" event will be emitted by the Comments Service to the event bus.
- We assume that only the moderation service will listen and care about to "commentCreated" event Type.
- Moderation Service will take a look at the content of the comment and will emit a "commentModerated" event type to the event bus with the "approved" or "rejected" status. (This will take a long time to happen)
- The event bus will emit the "commentModerated" event type to the all microservices that are listening to the event bus.
- The Query service maybe will be the unique service that care about to the "commentModerated" event type and will store the comment with the "approved" or "rejected" status. (at this point, users will be able to see the comment content in the UI if the comment was approved. otherwise, the comment will be see the comment content as "this comment is awaiting moderation" or "this comment has been rejected").

Cons of Option 1:

- It produces a delay between the time the comment is created and the comment is stored in the Query service.

Option 2 to implement the moderation service:

- Moderation service will be no longer the unique service that will take care about to the "commentModerated" event type. Query service will also take care about to the "commentModerated" event type.
- Query service will store the comment with the "pending" status when the comment is created. (This will be fast, and users will be able to see the comment content in the UI as "this comment is awaiting moderation").
- When Moderation Service emits the "commentModerated" event type to the event bus, the Query service will take care about to the "commentModerated" event type and will store the comment with the "approved" or "rejected" status.

classDiagram
    Animal <|-- Duck
    Animal <|-- Fish
    Animal <|-- Zebra
    Animal : +int age
    Animal : +String gender
    Animal: +isMammal()
    Animal: +mate()
    class Duck{
      +String beakColor
      +swim()
      +quack()
    }