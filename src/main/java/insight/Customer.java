package insight;

public class Customer {

  private String crn;
  private String firstName;
  private String lastName;
  private int numberAccounts;

  public Customer() {}

  public String getCrn() {
    return crn;
  }

  public void setCrn(String crn) {
    this.crn = crn;
  }

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public int getNumberAccounts() {
    return numberAccounts;
  }

  public void setNumberAccounts(int numberAccounts) {
    this.numberAccounts = numberAccounts;
  }

}