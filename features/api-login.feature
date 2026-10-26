# Feature: Login API
# User Story: US-10 — Login API
# Helper:     utils/api-helpers.ts — loginViaApi()
# Test File:  tests/api/login.spec.ts
# Base URL:   https://parabank.parasoft.com/parabank/services/bank/

Feature: Login REST API
  As an API consumer
  I want to authenticate via the ParaBank REST API
  So that I can obtain a customer ID for subsequent API operations

  # AC-10.1 — Successful API login
  Scenario: Login with valid credentials returns customer data
    Given the API base URL is configured
    When a POST request is sent to "login.htm" with valid credentials
    Then the response status is 200
    And the response body contains a customer "id"
