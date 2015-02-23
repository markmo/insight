package insight;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class InsightController {

    @RequestMapping("/customer")
    public Customer customer(@RequestParam(value="crn", defaultValue="123") String crn) {
        Customer customer = new Customer();
        customer.setCrn(crn);
        customer.setFirstName("Mark");
        customer.setLastName("Moloney");
        customer.setNumberAccounts(3);
        return customer;
    }
}