# Tax Calculator API Documentation

**Endpoint:** `POST /api/v1/taxes/tax-calculation/`

This API endpoint calculates the 2026 Kenyan Net Pay based on a provided gross salary. It computes statutory deductions (NSSF, SHIF, Affordable Housing Levy) and applies the correct PAYE bands and personal relief to arrive at the final net pay.

## Request Payload Structure

The API expects a JSON payload containing the following fields:

| Field | Type | Description | Required? |
|-------|------|-------------|-----------|
| `gross_salary` | numeric | The employee's gross basic salary plus any allowances. Minimum value is `1000`. | Yes |

---

## Example Scenarios

### 1. Entry-Level / Minimum Wage Bracket
Useful for testing deductions and tax logic for lower-income brackets.

```json
{
  "gross_salary": 25000.00
}
```

### 2. Middle-Income Salary
Testing a standard professional salary to see multiple PAYE bands engaged.

```json
{
  "gross_salary": 85000.00
}
```

### 3. High-Income Bracket
Testing a higher salary to ensure the logic correctly cascades through the 30%, 32.5%, and potentially 35% bands.

```json
{
  "gross_salary": 450000.00
}
```

### 4. Validation Error Payload
Example demonstrating payload validation error when the provided salary is below the minimum allowed value (e.g., `< 1000`). Send this to ensure your `TaxCalculationSerializer` is doing its job and catching bad data before it hits your Python logic.

```json
{
  "gross_salary": 500
}
```

**Expected Response:** `HTTP 400 Bad Request`
```json
{
  "gross_salary": [
    "Ensure this value is greater than or equal to 1000."
  ]
}
```
