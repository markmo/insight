package insight;

public class DisplayedData {

  private int sectionDisplayOrder;
  private String sectionName;
  private int fieldDisplayOrder;
  private String fieldname;

  public DisplayedData(int sectionDisplayOrder, String sectionName, int fieldDisplayOrder, String fieldname) {
    this.sectionDisplayOrder = sectionDisplayOrder;
    this.sectionName = sectionName;
    this.fieldDisplayOrder = fieldDisplayOrder;
    this.fieldname = fieldname;
  }

  public int getSectionDisplayOrder() {
    return sectionDisplayOrder;
  }

  public String getSectionName() {
    return sectionName;
  }

  public int getFieldDisplayOrder() {
    return fieldDisplayOrder;
  }

  public String getFieldname() {
    return fieldname;
  }
}