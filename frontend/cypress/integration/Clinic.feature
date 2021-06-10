Feature: Clinic

  This feature tests the creation of clinics and the given inputs

  Scenario Outline: Adding Clinics

    Given I am on the clinics tab
    And I add a new Clinic called "<clinicName>"
    And add details on the ABOUT form: "<consultationFee>" "<location>" "<roomNumber>" "<streetAddress>" "<city>" "<stateProvince>" "<postalCode>" "<country>"
    And add details on the AVAILABILITY form
    And add details on the LIMITS form: "<minSchedNotice>" 
    When I press save
    Then I will be on the Schedule Tab

    # Examples:
    #   | clinicName  | consultationFee | location      | roomNumber | streetAddress         | city       | stateProvince | postalCode | country     | minSchedNotice |                                                                                                       | minNoticeHrs | result |
    #   | Test Clinic | 500             | Pavia         | 8          | Parc Regency, Phase-H | Pavia      | Iloilo        | 5000       | Philippines | 3              |
    #   | Clinica     | 1000            | Jaro          | 1          | Plaza, Jaro           | Jaro       | Iloilo        | 5000       | Philippines | 4              |
    #   | Dr. Clinic  | 250             | Mandurriao    | 9          | Pali, Mandurriao      | Mandurriao | Iloilo        | 5000       | Philippines | 5              |

    Examples:
      | clinicName  | consultationFee | location    | roomNumber  | streetAddress         | city       | stateProvince | postalCode | country     | minSchedNotice |
      | Test Clinic | 500             | Pavia       | 8           | Parc Regency, Phase-H | Pavia      | Iloilo        | 5000       | Philippines | 3              |
      | Clinica     | 1000            | Jaro        | 1           | Plaza, Jaro           | Jaro       | Iloilo        | 5000       | Philippines | 4              |
      | Dr. Clinic  | 250             | Mandurriao  | 9           | Pali, Mandurriao      | Mandurriao | Iloilo        | 5000       | Philippines | 5              |



    
    

