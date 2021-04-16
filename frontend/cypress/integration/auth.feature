Feature: Sign up

  This feature allows user to sign up

  Scenario: Sign up as Patient
    Given the role is patient
    And the form is for patient only
    When I fill out all the fields
    And click sign up
    Then I successfully sign up as patient
    And would be directed to the home page
