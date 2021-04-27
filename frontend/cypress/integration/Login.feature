Feature: Login

  Scenario Outline: Login user
    Given "<email>" and "<password>"
    When I press login
    Then the result is: "<result>"

    Examples:
      | email           | password | result    |
      | user1@gmail.com | pass1    | logged in |
      | admin@admin.com | admin    | logged in |
      | user@gmail.com  | user     | not found |
      |                 |          | invalid   |
