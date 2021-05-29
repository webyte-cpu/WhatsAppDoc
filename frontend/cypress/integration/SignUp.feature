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
      | john.sm@gmail.com         | JohnSM123! | John    | Norch   | Smith  | Male   | 2000-01-25 | true    |
      | vannesahughes09@gmail.com | str0ngPas$ | Vanessa |         | Hughes | Female | 1997-12-01 | true    |
      | snikez123@gmail.com       | snikes123  | Snike   | Mosco   | Rogh   | Male   | 2000-01-05 | false   |
      | skiey                     | Snikey123! | Sky     |         | Blu    | Male   | 1999-12-12 | false   |

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
      | email                  | password     | fname      | midname | lname  | sex    | birthdate  | licenseImg         | specialization                 | licenseNum | expirationDate | isValid |
      | doctorjames@gmail.com  | JamesDoc123! | James      | Norch   | Smith  | Male   | 2000-01-25 | license-sample.png | Psychiatrist                   | 0012345    | 2023-01-25     | true    |
      | katejassy09@gmail.com  | str0ngPas$   | Kate Jassy |         | Villa  | Female | 1997-02-22 | license-sample.png | General Physician, Neurologist | 0174321    | 2024-02-21     | true    |
      | skippyDoctor@gmail.com | skippY!123   | Scotty     | Rodello | Jacque | Male   | 1999-04-21 | license-sample.png | Dentist                        |            | 2024-02-21     | false   |
      | skyrocket@gmail.com    | Rockette3r!  | Sky        |         | Reed   | Female | 1999-12-14 |                    | Nurse                          | 0123689    | 2023-01-01     | false   |
