package insight;

public class OrderedObject implements Comparable {

  private int displayOrder;
  private Object obj;

  public OrderedObject(int displayOrder, Object obj) {
    this.displayOrder = displayOrder;
    this.obj = obj;
  }

  public int getDisplayOrder() {
    return displayOrder;
  }

  public Object getValue() {
    return obj;
  }

  public boolean equals(Object other) {
    if (other == null || obj == null) {
      return false;
    } else {
      return obj.equals(other);
    }
  }

  public int compareTo(Object anotherOrderedObject) throws ClassCastException {
    if (!(anotherOrderedObject instanceof OrderedObject)) {
      throw new ClassCastException("An OrderedObject was expected.");
    }
    int anotherDisplayOrder = ((OrderedObject)anotherOrderedObject).getDisplayOrder();
    return this.displayOrder - anotherDisplayOrder;
  }
}