Feature: Clinic
  Background:
    Given I log in as DOCTOR
    And I am on the Clinics Tab


  Scenario Outline: Adding Clinics
    When I add a new clinic: "<clinicName>"
    And add details on the about form: 
      "<consultationFee>",
      "<location>",
      "<roomNumber>",
      "<streetAddress>",
      "<city>",
      "<stateProvince>",
      "<postalCode>",
      "<country>"
    And add details on the availabilty form:
      "<intervals>"
    And I input the minimum schedule notice hours: <"minNoticeHrs">
    And I Save
    Then The result is: "<result>"

    Examples:
    | clinicName  | consultationFee | location | roomNumber | streetAddress         | city  | stateProvince | postalCode | country     | intervals                                                                                                         | minNoticeHrs | result |
    | Test Clinic | 500             | Pavia    | 5          | Parc Regency, Phase-H | Pavia | Iloilo        | 5000       | Philippines | [{time: [{from: { hours: 12, minutes: 0, ampm: 'am' },to: { hours: 5, minutes: 0, ampm: 'am' }}], days: [1,3,5]}] | 2            | added  |




    
    

