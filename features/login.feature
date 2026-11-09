# Feature: User Login
# User Story: US-01 — User Authentication (UI)
# Page Object: pages/login.page.ts
# Test File:   tests/ui/login.spec.ts
@UI
Feature: User Login
As a bank customer
I want to log in to the ParaBank portal
So that I can securely access my accounts

Feature: Login functionality

  Scenario Outline: Login with different credentials
    Given the user is on the login page
    When the user enters username "<username>" and password "<password>"
    And the user clicks the login button
    Then the login result should be "<result>"

    Examples:
      | username | password | result  |
      | admin    | wrong123 | failure |
      | test     | test123  | failure |
      | json     | json     | success |

  @invalid-credentials
  Scenario: Customer logs in with invalid credentials and validates home page menus
    Given the user is on the login page
    When the user enters below credentials and validate error message
      | username     | password     |
      | invalidUser1 | invalidPass1 |
      | invalidUser2 | invalidPass2 |
    Then the user validates the following error details
      | Error!                                           |
      | The username and password could not be verified. |