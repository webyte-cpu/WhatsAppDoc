Feature: Login

  Scenario Outline: Login user
    Given "<email>" and "<password>"
    When I press login
    Then the result is: "<result>"

    Examples:
      | email                 | password     | result    |
      | john.sm@gmail.com     | JohnSM123!   | logged in |
      | doctorjames@gmail.com | JamesDoc123! | logged in |
      | user@gmail.com        | user         | not found |
      |                       |              | invalid   |
