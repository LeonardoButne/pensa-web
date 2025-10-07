package com.pensa.api.config;

import com.zaxxer.hikari.HikariDataSource; // Use HikariDataSource diretamente

import jakarta.persistence.EntityManagerFactory;

import javax.sql.DataSource;

import java.util.Properties; // Importe java.util.Properties

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;

@Configuration
@EnableJpaRepositories(
    basePackages = "com.pensa.api.repositories",
    entityManagerFactoryRef = "entityManagerFactory",
    transactionManagerRef = "transactionManager"
)
public class DataSourceConfig {

    // 1. WEB DATASOURCE (PRIMARY) - INJETA E USA AS PROPRIEDADES MAPEADAS
    @Primary
    @Bean(name = "webDataSource")
    public DataSource webDataSource(WebDataSourceProperties props) {
        // Usa HikariDataSource diretamente para garantir que as propriedades sejam definidas
        HikariDataSource dataSource = new HikariDataSource();
        
        // Define as propriedades explicitamente
        dataSource.setJdbcUrl(props.getUrl());
        dataSource.setUsername(props.getUsername());
        dataSource.setPassword(props.getPassword());
        dataSource.setDriverClassName(props.getDriverClassName());
        
        // Adicione outras propriedades HikariCP se necessário
        // dataSource.setMaximumPoolSize(20);
        
        return dataSource;
    }

    // 2. WEB ENTITY MANAGER FACTORY (JPA)
    @Primary
    @Bean(name = "entityManagerFactory")
    public LocalContainerEntityManagerFactoryBean entityManagerFactory(
            @Qualifier("webDataSource") DataSource webDataSource) {
        
        LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(webDataSource);
        em.setPackagesToScan("com.pensa.api.models"); // << Pacote das suas Entidades JPA
        
        JpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
        em.setJpaVendorAdapter(vendorAdapter);
        
        // **IMPORTANTE**: Define as propriedades do Hibernate. 
        // Se estiver no 'application.properties' use 'spring.jpa.properties.'
        // As demais propriedades do JPA/Hibernate devem ser configuradas aqui se não estiverem no application.properties
        Properties properties = new Properties();
        properties.put("hibernate.hbm2ddl.auto", "update"); // Exemplo de ddl-auto
        properties.put("hibernate.dialect", "org.hibernate.dialect.MySQLDialect"); // Use MySQLDialect (conforme a sugestão do seu log)
        em.setJpaProperties(properties);
        
        return em;
    }

    // 3. WEB TRANSACTION MANAGER
    @Primary
    @Bean(name = "transactionManager")
    public PlatformTransactionManager transactionManager(
            @Qualifier("entityManagerFactory") EntityManagerFactory entityManagerFactory) {
        
        return new JpaTransactionManager(entityManagerFactory);
    }
    
    // --- USSD DATASOURCE (Secundário) ---
    // Mantenha seu USSD Datasource aqui, se necessário (certifique-se de que ele não usa @Primary)
    // Exemplo:
    
    @Bean(name = "ussdDataSource")
    @ConfigurationProperties(prefix = "spring.ussd-datasource")
    public DataSource ussdDataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean(name = "ussdJdbcTemplate")
    public JdbcTemplate ussdJdbcTemplate(@Qualifier("ussdDataSource") DataSource ussdDataSource) {
        return new JdbcTemplate(ussdDataSource);
    }
    
}