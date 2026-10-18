# Feature: Transactions REST API
# User Story: US-13 — Transactions REST API
# Helper:     utils/api-helpers.ts — getAccountTransactions(), transferFunds()
# Test File:  tests/api/transactions.spec.ts
# Base URL:   https://parabank.parasoft.com/parabank/services/bank/

Feature: Transactions REST API
  As an API consumer
  I want to retrieve and search transactions via API
  So that I can inspect account activity programmatically

  Background:
    Given a valid customer is logged in via the API
    And the customerId and accountId are stored for subsequent requests

  # AC-13.1 — Get account transactions
  Scenario: Retrieve all transactions for an account
    When a GET request is sent to "accounts/{accountId}/transactions"
    And the "Accept: application/json" header is set
    Then the response status is 200
    And the response body is a JSON array

  # AC-13.2 — Transfer funds via API
  Scenario: Transfer funds between two accounts via API
    Given the customer has at least two accounts
    When a POST request is sent to "transfer?fromAccountId={accountId1}&toAccountId={accountId2}&amount=10"
    And the "Accept: application/json" header is set
    Then the response status is 200

  # AC-13.3 — Search transactions by amount
  Scenario: Get transactions filtered by amount
    When a GET request is sent to "accounts/{accountId}/transactions/amount/100"
    And the "Accept: application/json" header is set
    Then the response status is 200

  # ---- PRACTICE TASK (Level 2 - #5) ----
  # Scenario: Transferred funds appear in account transactions
  #   Given the user has at least two accounts
  #   When the user transfers "10" from account A to account B via API
  #   And a GET request is sent to "accounts/{accountB}/transactions"
  #   Then the transactions list contains a transaction with amount "10"
  #   And the transaction type is "Credit"
