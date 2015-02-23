package insight;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import java.net.URI;
import java.net.URISyntaxException;
import java.sql.*;

@RestController
public class InsightController {

    @RequestMapping("/customer/{crn}")
    public Customer customer(@PathVariable String crn) {
        Customer customer = new Customer();
        Connection connection = null;
        try {
            connection = getConnection();

            Statement stmt = connection.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT firstname, lastname, number_accounts FROM customers where crn = '" + crn + "'");

            customer.setCrn(crn);
            rs.next();
            customer.setFirstName(rs.getString("firstname"));
            customer.setLastName(rs.getString("lastname"));
            customer.setNumberAccounts(rs.getInt("number_accounts"));

        } catch (Exception e) {
            System.out.println("There was an error: " + e.getMessage());
        } finally {
            if (connection != null) try{connection.close();} catch(SQLException e){}
        }
        return customer;
    }

    private Connection getConnection() throws URISyntaxException, SQLException {
        URI dbUri = new URI(System.getenv("DATABASE_URL"));

        String username = dbUri.getUserInfo().split(":")[0];
        String password = dbUri.getUserInfo().split(":")[1];
        int port = dbUri.getPort();

        String dbUrl = "jdbc:postgresql://" + dbUri.getHost() + ":" + port + dbUri.getPath();

        return DriverManager.getConnection(dbUrl, username, password);
    }
}