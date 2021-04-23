Feature: Sign up

  This feature allows user to sign up

  Scenario Outline: Patient User Credentials
    Given the selected role is PATIENT
    And I type the personal infos: "<email>", "<password>", "<fname>", "<midname>", "<lname>"
    And select the sex "<sex>" and birthdate "<birthdate>"
    When I click sign up
    Then the form is "<isValid>"

    # testing birthdate year currently limited to 1997 - 2008
    Examples:
      | email                     | password   | fname   | midname | lname  | sex    | birthdate  | isValid |
      | john.sm@gmail.com         | JohnSM123! | John    | Norch   | Smith  | Male   | 25-01-2000 | true    |
      | vannesahughes09@gmail.com | str0ngPas$ | Vanessa |         | Hughes | Female | 21-02-1997 | true    |
      | snikez123@gmail.com       | snikes123  | Snike   | Mosco   | Rogh   | Male   | 01-05-2000 | false   |
      | skiey                     | Snikey123! | Sky     |         | Blu    | Male   | 12-12-1999 | false   |

  Scenario Outline: Doctor User Credentials
    Given the selected role is DOCTOR
    And I type the personal infos: "<email>", "<password>", "<fname>", "<midname>", "<lname>"
    And select the sex "<sex>" and birthdate "<birthdate>"
    And add my doctor infos: "<specialization>", "<licenseNum>", "<expirationDate>"
    And upload my photo: "<licenseImg>"
    When I click sign up
    Then the form is "<isValid>"

    # testing birthdate year currently limited to 1997 - 2008
    Examples:
      | email                     | password   | fname   | midname | lname  | sex    | birthdate  | licenseImg         | specialization | licenseNum | expirationDate | isValid |
      | john.sm@gmail.com         | JohnSM123! | John    | Norch   | Smith  | Male   | 25-01-2000 | license-sample.png | Psychiatrist   | 0012345    | 25-01-2023     | true    |
      | vannesahughes09@gmail.com | str0ngPas$ | Vanessa |         | Hughes | Female | 21-02-1997 |                    | Dentist        | 0174321    | 21-02-2024     | true    |
      | snikez123@gmail.com       | snikes123  | Snike   | Mosco   | Rogh   | Male   | 01-05-2000 | license-sample.png | Dentist        | 0123689    | 30-12-2021     | false   |
      | snikez123@gmail.com       | Snikey123! | Sky     |         | Blu    | Male   | 12-12-1999 |                    | Driver         |            | 25-01-2023     | false   |
