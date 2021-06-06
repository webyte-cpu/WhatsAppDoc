Feature: Login

  Scenario Outline: Login user
    Given "<email>" and "<password>"
    When I press login
    Then the result is: "<result>"

    Examples:
      | email                       | password          | result    |
      | Blake_Gleichner@gmail.com   | udHCyaQtfxpZN6r!  | logged in |
      | Billie97@yahoo.com          | guG3Xxq9j4_GqQ2!  | logged in |
      | testemail@hotmail.com       | user              | not found |
      | Lupe_Predovic7@hotmail.com  | password          | invalid   |
