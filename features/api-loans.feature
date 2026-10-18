# Feature: Loans REST API
# User Story: US-14 — Loans REST API
# Helper:     utils/api-helpers.ts — requestLoan()
# Test File:  tests/api/loans.spec.ts
# Base URL:   https://parabank.parasoft.com/parabank/services/bank/

Feature: Loans REST API
  As an API consumer
  I want to request a loan via API
  So that loan processing can be validated programmatically

  Background:
    Given a valid customer is logged in via the API
    And the customerId and a source accountId are stored for subsequent requests

  # AC-14.1 — Loan request returns approved boolean
  Scenario: Request a loan with a reasonable amount and down payment
    When a POST request is sent to "requestLoan?customerId={customerId}&amount=500&downPayment=100&fromAccountId={accountId}"
    And the "Accept: application/json" header is set
    Then the response status is 200
    And the response body contains an "approved" field of type boolean

  # AC-14.2 — Loan response includes provider name
  Scenario: Loan response includes loanProviderName
    When a POST request is sent to "requestLoan?customerId={customerId}&amount=100&downPayment=10&fromAccountId={accountId}"
    And the "Accept: application/json" header is set
    Then the response body contains a "loanProviderName" field

  # AC-14.3 — Large loan with small down payment may be denied
  Scenario: Large loan with minimal down payment results in a boolean approved status
    When a POST request is sent to "requestLoan?customerId={customerId}&amount=999999&downPayment=1&fromAccountId={accountId}"
    And the "Accept: application/json" header is set
    Then the response body contains an "approved" field of type boolean
    And the "approved" field may be false for large loans with insufficient down payment

  # ---- EXTENDED SCENARIOS ----
  # Scenario: Approved loan creates a new account for the loan
  #   When a POST request is sent with a small loan amount that is likely to be approved
  #   Then the response contains a "loanAccountId" field with the newly created account
