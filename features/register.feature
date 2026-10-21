# Feature: User Registration
Feature: User Registration
  As a new customer
  I want to register an account on ParaBank
  So that I can access banking services

  Background:
    Given the user is on the ParaBank registration page

  # AC-02.1 — Successful registration
  Scenario: Register a new user with all valid details
    When the user fills in all required registration fields with valid data
    And the user clicks the "Register" button
    Then a welcome or success message is displayed
    Then UserName and Passowrd shuld be saved

  # AC-02.2 — Empty form validation
  Scenario: Validation errors shown when form is submitted empty
    When the user clicks the "Register" button without filling any fields
    Then validation error messages count shuold be 10

