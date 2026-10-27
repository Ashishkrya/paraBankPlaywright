# Feature: Accounts Overview
# User Story: US-03 — Accounts Overview (UI)
# Page Object: pages/accounts-overview.page.ts
# Test File:   tests/ui/accounts-overview.spec.ts

Feature: Accounts Overview
  As a logged-in customer
  I want to view a summary of all my bank accounts
  So that I can monitor balances at a glance

  Background:
    Given the user navigates to the Accounts Overview page

  # AC-03.1 — Heading visible
  Scenario: Accounts Overview page displays the heading
    Then the heading "Accounts Overview" is visible
  # AC-03.3 — Navigate to Account Details
  Scenario: Clicking an account link opens the Account Details page
    Then at least one account link is visible in the accounts table
    When the user clicks on the first account link
    Then the "Account Details" heading is visible on the destination page
    And the Account Details page shows the matching account ID

