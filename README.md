# Microservices with Node JS and React

## Section 1: How this project was created

```bash
# posts/
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
