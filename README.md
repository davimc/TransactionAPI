# Transaction Processing API

Backend API responsible for processing **payments and refunds** and retrieving transaction history for invoices.

This project was developed as part of a backend technical challenge.

---

# Technologies

- Node.js
- NestJS
- TypeORM
- SQLite
- Jest
- Docker

---

# Project Structure

```
src
 ├ modules
 │   ├ transactions
 │   │   ├ transactions.controller.ts
 │   │   ├ transactions.service.ts
 │   │   ├ transactions.service.spec.ts
 │   │   └ entities
 │   └ invoices
 │       ├ invoices.controller.ts
 │       └ invoices.service.ts
 ├ app.module.ts
```

## Running Locally

Install dependencies:

```
yarn install
```

Start the development server:

```
yarn start:dev
```

---

# API Endpoints

## Create Transaction

```
POST /transactions
```

Example request:

```json
{
  "invoice_id": "123",
  "type": "payment",
  "amount": 100,
  "currency": "USD"
}
```

Transaction types:

- payment
- refund

---

## Get Transactions by Invoice

```
GET /invoices/{invoice_id}/transactions
```

Example response:

```json
{
  "invoice_id": "123",
  "transactions": [
    {
      "id": "tx1",
      "type": "payment",
      "amount": 100
    },
    {
      "id": "tx2",
      "type": "refund",
      "amount": 30
    }
  ],
  "balance": 70
}
```

Where:

```
balance = payments - refunds
```

---

# Business Rules

The API enforces the following rules:

1. Refunds require at least one payment.
2. The refunded amount cannot exceed the total payment amount.
3. Transactions are associated with an invoice using `invoice_id`.

---

# Running Tests

Run unit tests with:

```
yarn test
```

Tests focus on validating the main business rules of the transaction service.

---

# Design Decisions

- NestJS provides a modular architecture and dependency injection.
- SQLite was chosen as a lightweight database suitable for local environments.
- Business logic was centralized in the service layer.
- Controllers remain thin and only orchestrate requests.

---

# Possible Improvements

Future improvements could include:

- Integration tests
- Pagination for transaction history
- Idempotency support for transaction creation
