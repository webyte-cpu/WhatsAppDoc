Feature: Verify

  This feature allows admin to check and verify the doctor's information and license card

  Scenario Outline: Check each status tab
    Given I am on "<status>" tab
    Then I will see all "<status>" doctors
  
    Examples:
      | status     |
      | PENDING    |
      | VERIFIED   |
      | UNVERIFIED |

  Scenario Outline: Check Verified User Details
    Given I am already on "<status>" tab
    When I click the user details with "<status>" status
    Then I will see the doctor's license card information

    Examples: 
      | status     |
      | VERIFIED   |
      | UNVERIFIED |