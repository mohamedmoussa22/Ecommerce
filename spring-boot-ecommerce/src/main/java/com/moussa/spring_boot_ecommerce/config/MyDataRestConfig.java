package com.moussa.spring_boot_ecommerce.config;


import com.moussa.spring_boot_ecommerce.entity.Country;
import com.moussa.spring_boot_ecommerce.entity.Product;
import com.moussa.spring_boot_ecommerce.entity.ProductCategory;
import com.moussa.spring_boot_ecommerce.entity.State;
import jakarta.persistence.EntityManager;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.core.mapping.ExposureConfigurer;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {


    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {

        HttpMethod[] theUnsupportedActions = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE, HttpMethod.PATCH};

        // disable HTTP methods for Product: PUT, POST, DELETE and PATCH
        disableHttpMethod(Product.class, config, theUnsupportedActions);
        disableHttpMethod(ProductCategory.class, config, theUnsupportedActions);
        disableHttpMethod(Country.class, config, theUnsupportedActions);
        disableHttpMethod(State.class, config, theUnsupportedActions);
        config.exposeIdsFor(Product.class, ProductCategory.class, Country.class, State.class);
    }

    private static void disableHttpMethod(Class theClass, RepositoryRestConfiguration config, HttpMethod[] theUnsupportedActions) {
        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));
    }

}