# SACCO Dividend Calculator API Documentation

**Endpoint:** `POST /api/v1/saccos/calculate-dividend/`

This API endpoint calculates the end-of-year SACCO dividend and interest payout based on Kenyan SACCO math. It handles flat dividend rates for Share Capital, flat interest rates for existing deposits, pro-rated interest for new monthly contributions, and applies the standard 5% KRA Withholding Tax on the gross payout.

## Request Payload Structure

The API expects a JSON payload containing the following fields:

| Field | Type | Description | Required? |
|-------|------|-------------|-----------|
| `share_capital` | numeric | The member's fixed share capital (e.g., `30000`). Minimum value is `0.0`. | Yes |
| `current_deposits` | numeric | The member's total deposits at the start of the year (BOSA). Minimum value is `0.0`. | Yes |
| `monthly_contribution` | numeric | The amount the member contributes every month. Minimum value is `0.0`. | Yes |
| `share_rate` | numeric | The announced dividend rate on share capital (e.g., `15.0` for 15%). Minimum value is `0.0`. | Yes |
| `deposit_rate` | numeric | The announced interest rate on deposits (e.g., `11.0` for 11%). Minimum value is `0.0`. | Yes |

---

## Example Scenarios

### 1. The "Standard Member" Payload
This represents a typical SACCO member who has been in the SACCO for a few years, has a solid deposit base, and continues to contribute monthly. This tests the combination of flat interest on existing deposits, pro-rated interest on the monthly contributions, and the flat dividend on the share capital.

```json
{
  "share_capital": 30000.00,
  "current_deposits": 450000.00,
  "monthly_contribution": 15000.00,
  "share_rate": 15.0,
  "deposit_rate": 11.0
}
```

### 2. The "New Member" Payload
This represents someone who just joined at the beginning of the year. They paid their minimum share capital and are aggressively saving every month, but started with zero deposits. This ensures the `new_deposit_interest` loop correctly handles the bulk of the interest calculation while `existing_deposit_interest` stays at `0`.

```json
{
  "share_capital": 20000.00,
  "current_deposits": 0.00,
  "monthly_contribution": 30000.00,
  "share_rate": 14.5,
  "deposit_rate": 10.5
}
```

### 3. The "Inactive/Retired Saver" Payload
This represents a member who has a large accumulated deposit but is no longer making monthly contributions (e.g., they changed jobs or retired). This verifies that a zero-value monthly contribution doesn't throw a division-by-zero or iteration error.

```json
{
  "share_capital": 50000.00,
  "current_deposits": 1200000.00,
  "monthly_contribution": 0.00,
  "share_rate": 16.0,
  "deposit_rate": 12.0
}
```

### 4. Validation Error Payload
Example demonstrating payload validation error when the provided input is negative, ensuring the `SaccoDividendSerializer` prevents users from inputting impossible financial data.

```json
{
  "share_capital": -5000.00,
  "current_deposits": 100000.00,
  "monthly_contribution": 5000.00,
  "share_rate": 12.0,
  "deposit_rate": 9.0
}
```

**Expected Response:** `HTTP 400 Bad Request`
```json
{
  "share_capital": [
    "Ensure this value is greater than or equal to 0."
  ]
}
```
