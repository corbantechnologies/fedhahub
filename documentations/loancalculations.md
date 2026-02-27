# Loan Calculator API Documentation

**Endpoint:** `POST /api/v1/loans/calculate-loan/`

This API endpoint calculates loan payments and terms based on the provided configuration. It supports both **Flat Rate** and **Reducing Balance** loan types, and can calculate either fixed payment amounts across a set term, or calculate the loan term based on a fixed monthly payment.

## Request Payload Structure

The API expects a JSON payload containing the following fields:

| Field | Type | Description | Required? |
|-------|------|-------------|-----------|
| `mode` | string | The calculation mode. Must be either `"fixed_term"` or `"fixed_payment"`. | Yes |
| `loan_type` | string | The type of loan interest. Must be either `"flat"` or `"reducing"`. | Yes |
| `principal` | numeric | The total principal loan amount. | Yes |
| `annual_rate` | numeric | The annual interest rate as a percentage (e.g., `12.0` for 12%). | Yes |
| `term_months` | integer | The term of the loan in months. | Yes, if `mode` is `"fixed_term"` |
| `payment_per_month` | numeric | The fixed monthly payment amount. | Yes, if `mode` is `"fixed_payment"` |
| `start_date` | string (YYYY-MM-DD) | The start date of the loan. Defaults to the current date if omitted. | No |

---

## Example Scenarios

### 1. Calculate Payment (Fixed Term - Flat Rate)
Used to calculate the monthly payment and total schedule over a fixed term with flat interest.

```json
{
  "principal": 100000,
  "annual_rate": 12.0,
  "loan_type": "flat",
  "mode": "fixed_term",
  "term_months": 24,
  "start_date": "2026-03-01"
}
```

### 2. Calculate Payment (Fixed Term - Reducing Balance)
Used to calculate the schedule over a fixed term with a reducing balance.
*(Note: `start_date` is omitted here to demonstrate the API's fallback to `date.today()`)*

```json
{
  "principal": 500000,
  "annual_rate": 13.5,
  "loan_type": "reducing",
  "mode": "fixed_term",
  "term_months": 36
}
```

### 3. Calculate Term (Fixed Payment - Flat Rate)
Used to calculate how many months the loan will run for given a specific fixed monthly payment on a flat rate.

```json
{
  "principal": 200000,
  "annual_rate": 10.0,
  "loan_type": "flat",
  "mode": "fixed_payment",
  "payment_per_month": 15000
}
```

### 4. Calculate Term (Fixed Payment - Reducing Balance)
Used to calculate the required term given a specific fixed monthly payment on a reducing balance limit.

```json
{
  "principal": 300000,
  "annual_rate": 14.0,
  "loan_type": "reducing",
  "mode": "fixed_payment",
  "payment_per_month": 12000,
  "start_date": "2026-04-01"
}
```

### 5. Validation Error Payload
Example demonstrating payload validation error when a required field (`term_months`) is missing for a specific `mode` (`fixed_term`).

```json
{
  "principal": 100000,
  "annual_rate": 12.0,
  "loan_type": "flat",
  "mode": "fixed_term",
  "payment_per_month": 5000
}
```

**Expected Response:** `HTTP 400 Bad Request`
```json
{
  "term_months": ["Required when calculating payment for a fixed term."]
}
```