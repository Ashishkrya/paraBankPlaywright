# Feature: Accounts Overview
# User Story: US-03 — Accounts Overview (UI)
# Page Object: pages/accounts-overview.page.ts
# Test File:   tests/ui/accounts-overview.spec.ts

Feature: Accounts Overview
  As a logged-in customer
  I want to view a summary of all my bank accounts
  So that I can monitor balances at a glance

  Background:
    Given the user is logged in to ParaBank
    And the user navigates to the Accounts Overview page

  # AC-03.1 — Heading visible
  Scenario: Accounts Overview page displays the heading
    Then the heading "Accounts Overview" is visible

  # AC-03.2 — At least one account listed
  Scenario: At least one account is listed
    Then at least one account link is visible in the accounts table

  # AC-03.3 — Navigate to Account Details
  Scenario: Clicking an account link opens the Account Details page
    When the user clicks on the first account link
    Then the "Account Details" heading is visible on the destination page

  # AC-03.4 — Total balance row
  # PRACTICE TASK (Level 1 - #3): Add test to verify total balance cell is visible
  Scenario: Total balance cell is shown at the bottom of the accounts table
    Then the total balance cell in the accounts table footer is visible

  # ---- EXTENDED SCENARIOS (Practice Task - Level 3 #7) ----
  # Scenario: Account Details page shows the correct account ID
  #   When the user clicks on a specific account link
  #   Then the Account Details page shows the matching account ID
  #
  # Scenario: Account Details page shows current balance
  #   When the user clicks on a specific account link
  #   Then the account balance is displayed on the Account Details page
