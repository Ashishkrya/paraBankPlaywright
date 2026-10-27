# Feature: Bill Payment
# User Story: US-06 — Bill Payment (UI)
# Page Object: pages/bill-pay.page.ts
# Test File:   tests/ui/bill-pay.spec.ts
# Helper:      utils/test-data.ts — generateBillPayee()

Feature: Bill Payment
  As a logged-in customer
  I want to pay bills to a payee
  So that I can settle payments directly from my bank account

  Background:
    Given the user is logged in to ParaBank and user navigates to the Bill Pay page

  # AC-06.1 — Page elements visible
  Scenario: Bill Pay page displays the required form elements
    Then the heading "Bill Payment Service" is visible on the Bill Pay page
    And the payee name input is visible

  # AC-06.2 — Successful bill payment
  Scenario: Pay a bill successfully with complete payee details
    When the user fills in the payee name "John Doe"
    And the user fills in the payee address "456 Pay Street", city "Paytown", state "NY", zip "10001"
    And the user fills in the payee phone "555-0200"
    And the user fills in the payee account number "12345"
    And the user confirms the account number "12345"
    And the user enters payment amount "50"
    When the user clicks the "Send Payment" button
    Then the confirmation message "Bill Payment Complete" is displayed

  # AC-06.3 — Empty form validation
  Scenario: Validation errors appear when form is submitted empty
    When the user clicks the "Send Payment" button without filling any fields
    Then at least one validation error is displayed

 
