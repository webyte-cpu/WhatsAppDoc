Feature: Verify

  This feature allows admin to check and verify a doctors' license

  Scenario Outline: Check each status tab
    Given I am on "<status>" tab
    Then I will see all "<status>" doctors
  
    Examples:
      | status     |
      | PENDING    |
      | VERIFIED   |
      | UNVERIFIED |

  Scenario Outline: Verify Doctors' license
    Given I am on pending tab
    When I click doctor "<name>"
    Then I will see the doctor's license card information
    And I click "<changeStatus>" button
    Then I will see "<name>" on "<changeStatus>" tabs

    Examples:
      | name        | changeStatus |
      | Francisco   | verify       |
      | Ferne       | deny         |
      | Kassandra   | verify       |
      | Nettie      | verify       |