CREATE TABLE public.bankers (
                banker_id INTEGER NOT NULL,
                firstname VARCHAR(100) NOT NULL,
                lastname VARCHAR(100) NOT NULL,
                CONSTRAINT bankers_pk PRIMARY KEY (banker_id)
);


CREATE TABLE public.sections (
                section_id INTEGER NOT NULL,
                section_name VARCHAR(100) NOT NULL,
                display_order INTEGER NOT NULL,
                CONSTRAINT sections_pk PRIMARY KEY (section_id)
);


CREATE TABLE public.display_names (
                column_name VARCHAR(30) NOT NULL,
                display_name VARCHAR(100) NOT NULL,
                section_id INTEGER NOT NULL,
                display_order INTEGER NOT NULL,
                CONSTRAINT display_names_pk PRIMARY KEY (column_name)
);


CREATE TABLE public.product_type (
                product_type_id INTEGER NOT NULL,
                product_type_name VARCHAR(100) NOT NULL,
                CONSTRAINT product_type_pk PRIMARY KEY (product_type_id)
);


CREATE TABLE public.rpdata (
                suburb VARCHAR(100) NOT NULL,
                median_sale_price INTEGER NOT NULL,
                average_tom INTEGER NOT NULL,
                median_rent INTEGER NOT NULL,
                annual_growth_percent NUMERIC NOT NULL,
                three_year_growth_percent NUMERIC NOT NULL,
                CONSTRAINT rpdata_pk PRIMARY KEY (suburb)
);


CREATE TABLE public.customers (
                crn VARCHAR(100) NOT NULL,
                title VARCHAR(10),
                firstname VARCHAR(100) NOT NULL,
                lastname VARCHAR(100) NOT NULL,
                after_hours_phone VARCHAR(50),
                email VARCHAR(100),
                street_number VARCHAR(10),
                street_name VARCHAR(100) NOT NULL,
                suburb VARCHAR(100) NOT NULL,
                state VARCHAR(50) NOT NULL,
                customer_type VARCHAR(50) NOT NULL,
                gender VARCHAR(10),
                marital_status VARCHAR(50),
                nab_segment VARCHAR(100) NOT NULL,
                is_nab_main_bank BIT NOT NULL,
                retail_customer_rating INTEGER NOT NULL,
                ib_activity INTEGER NOT NULL,
                cc_activity INTEGER NOT NULL,
                branch_activity INTEGER NOT NULL,
                nab_atm_activity INTEGER NOT NULL,
                num_dd_competitors INTEGER NOT NULL,
                num_competitor_debits INTEGER NOT NULL,
                value_competitor_debits NUMERIC NOT NULL,
                most_recent_competitor VARCHAR(100),
                total_most_recent_comp_debits INTEGER NOT NULL,
                most_recent_comp_debit_dt TIMESTAMP NOT NULL,
                most_recent_comp_debit_value NUMERIC NOT NULL,
                second_recent_competitor VARCHAR(100),
                total_second_competitor_debits INTEGER NOT NULL,
                second_comp_debit_dt TIMESTAMP NOT NULL,
                second_comp_debit_value NUMERIC NOT NULL,
                num_siebel_contacts INTEGER NOT NULL,
                most_recent_siebel_response TIMESTAMP,
                siebel_activity_code VARCHAR(100),
                num_previous_ecl_applications INTEGER NOT NULL,
                most_recent_ecl_application_dt TIMESTAMP,
                most_recent_product_applied VARCHAR(100),
                most_recent_prod_app_decision VARCHAR(100),
                occupation_cd VARCHAR(100),
                num_salary_credits INTEGER,
                salary_credits_value NUMERIC,
                employer_from_application VARCHAR(100),
                primary_employer_from_credits VARCHAR(100),
                secondary_employer VARCHAR(100),
                CONSTRAINT customers_pk PRIMARY KEY (crn)
);
COMMENT ON COLUMN public.customers.customer_type IS '''individual'' or ''organisation''';


CREATE TABLE public.relationships (
                crn VARCHAR(100) NOT NULL,
                banker_id INTEGER NOT NULL,
                CONSTRAINT relationships_pk PRIMARY KEY (crn, banker_id)
);


CREATE TABLE public.spend_categories (
                crn VARCHAR(100) NOT NULL,
                seq INTEGER NOT NULL,
                subcategory VARCHAR(100) NOT NULL,
                category VARCHAR(100) NOT NULL,
                CONSTRAINT spend_categories_pk PRIMARY KEY (crn, seq)
);


CREATE TABLE public.property_data (
                crn VARCHAR(100) NOT NULL,
                property_type VARCHAR(100) NOT NULL,
                num_bedrooms INTEGER,
                num_bathrooms INTEGER,
                area_m2 INTEGER,
                last_settlement_dt TIMESTAMP NOT NULL,
                last_contract_value NUMERIC NOT NULL,
                estimated_value NUMERIC,
                listing_type VARCHAR(100),
                listing_dt TIMESTAMP,
                list_price NUMERIC,
                CONSTRAINT property_data_pk PRIMARY KEY (crn)
);


CREATE TABLE public.customer_products (
                crn VARCHAR(100) NOT NULL,
                product_type_id INTEGER NOT NULL,
                balance NUMERIC NOT NULL,
                CONSTRAINT customer_products_pk PRIMARY KEY (crn, product_type_id)
);


ALTER TABLE public.relationships ADD CONSTRAINT bankers_relationships_fk
FOREIGN KEY (banker_id)
REFERENCES public.bankers (banker_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.display_names ADD CONSTRAINT sections_display_names_fk
FOREIGN KEY (section_id)
REFERENCES public.sections (section_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.customer_products ADD CONSTRAINT product_type_customer_products_fk
FOREIGN KEY (product_type_id)
REFERENCES public.product_type (product_type_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.customer_products ADD CONSTRAINT customers_customer_products_fk
FOREIGN KEY (crn)
REFERENCES public.customers (crn)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.property_data ADD CONSTRAINT customers_property_data_fk
FOREIGN KEY (crn)
REFERENCES public.customers (crn)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.spend_categories ADD CONSTRAINT customers_spend_categories_fk
FOREIGN KEY (crn)
REFERENCES public.customers (crn)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.relationships ADD CONSTRAINT customers_relationships_fk
FOREIGN KEY (crn)
REFERENCES public.customers (crn)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;