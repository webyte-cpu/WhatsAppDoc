Feature: Clinic

  This feature tests the creation of clinics and the given inputs

  Scenario: Adding Clinics

    Given I am on the clinics tab
    And I add a new Clinic called "<clinicName>"
    And add details on the ABOUT form: "<consultationFee>" "<location>" "<roomNumber>" "<streetAddress>" "<city>" "<stateProvince>" "<postalCode>" "<country>"
    And add details on the AVAILABILITY form: "<intervals>"
    # When I press save
    # Then I will be shown a warning modal
    # And I input the minimum schedule notice hours: <"minNoticeHrs">
    # And I Save
    # Then The result is: "<result>"

    # Examples:
    # | clinicName  | consultationFee | location | roomNumber | streetAddress         | city  | stateProvince | postalCode | country     | intervals                                                                                                         | minNoticeHrs | result |
    # | Test Clinic | 500             | Pavia    | 5          | Parc Regency, Phase-H | Pavia | Iloilo        | 5000       | Philippines | [{time: [{from: { hours: 12, minutes: 0, ampm: 'am' },to: { hours: 5, minutes: 0, ampm: 'am' }}], days: [1,3,5]}] | 2            | added  |




    
    

