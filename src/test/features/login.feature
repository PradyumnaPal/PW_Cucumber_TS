Feature: Log in to OrangeHrm site

  @regression
  Scenario Outline: Log in using userId and Password
    Given I am on Login Page of OrangeHRMS
    When I enter userid as "<userid>" and password as "<password>"
    And I click on Login button
    Then I verify the login status message as "<msg>"

    Examples:
      | userid | password | msg                 |
      | Admin  | admin123 | Dashboard           |
      | Admin  | Invalid  | Invalid credentials |
