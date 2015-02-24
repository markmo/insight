package insight;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import java.net.URI;
import java.net.URISyntaxException;
import java.sql.*;
import java.util.HashMap;
import java.util.Map;
import org.json.JSONArray;
import org.json.JSONObject;
import org.json.JSONException;

@RestController
public class InsightController {

    @RequestMapping("/customer/{crn}")
    public String customer(@PathVariable String crn) {
        JSONObject json = new JSONObject();
        Connection connection = null;
        try {
            connection = getConnection();

            Map<String, String[]> displayNames = new HashMap<String, String[]>();

            Statement stmt = connection.createStatement();
            ResultSet rs1 = stmt.executeQuery("select column_name, section_name, display_name from display_names dn join sections se on se.section_id = dn.section_id order by se.display_order, dn.display_order");
            while (rs1.next()) {
                displayNames.put(rs1.getString("column_name"), new String[] {rs1.getString("section_name"), rs1.getString("display_name")});
            }

            ResultSet rs = stmt.executeQuery("select crn, title, firstname, lastname, after_hours_phone, email, street_number, street_name, cu.suburb, state, customer_type, gender, marital_status, nab_segment, is_nab_main_bank, retail_customer_rating, ib_activity, cc_activity, branch_activity, nab_atm_activity, num_dd_competitors, num_competitor_debits, value_competitor_debits, most_recent_competitor, total_most_recent_comp_debits, most_recent_comp_debit_dt, most_recent_comp_debit_value, second_recent_competitor, total_second_competitor_debits, second_comp_debit_dt, second_comp_debit_value, num_siebel_contacts, most_recent_siebel_response, siebel_activity_code, num_previous_ecl_applications, most_recent_comp_debit_dt, most_recent_product_applied, most_recent_prod_app_decision, occupation_cd, num_salary_credits, salary_credits_value, employer_from_application, primary_employer_from_credits, secondary_employer, median_sale_price, average_tom, median_rent, annual_growth_percent, three_year_growth_percent from customers cu join rpdata rp on rp.suburb = cu.suburb where crn = '" + crn + "'");

            JSONObject obj = new JSONObject();
            ResultSetMetaData metadata = rs.getMetaData();
            int k = metadata.getColumnCount();
            String currentSection = "";
            boolean first = true;
            rs.next();
            for (int i = 1; i <= k; i++) {
                String columnName = metadata.getColumnName(i);
                String[] labels = displayNames.get(columnName);
                String displayName = columnName;
                if (labels == null) {
                    currentSection = "";
                } else {
                    if (!currentSection.equals(labels[0])) {
                        if (!first) json.put(currentSection, obj);
                        first = false;
                        obj = new JSONObject();
                        currentSection = labels[0];
                    }
                    displayName = labels[1];
                }
                if (metadata.getColumnType(i) == java.sql.Types.INTEGER) {
                    obj.put(displayName, rs.getInt(columnName));
                } else if (metadata.getColumnType(i) == java.sql.Types.BOOLEAN) {
                    obj.put(displayName, rs.getBoolean(columnName));
                } else {
                    obj.put(displayName, rs.getString(columnName));
                }
            }
            json.put(obj);

        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("There was an error: " + e.getMessage());
        } finally {
            if (connection != null) try{connection.close();} catch(SQLException e){}
        }
        return json.toString();
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