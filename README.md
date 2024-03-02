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
