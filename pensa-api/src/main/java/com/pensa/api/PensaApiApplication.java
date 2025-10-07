package com.pensa.api;

// import org.springframework.boot.SpringApplication;
// import org.springframework.boot.autoconfigure.SpringBootApplication;

// @SpringBootApplication
// public class PensaApiApplication {

//     public static void main(String[] args) {
//         SpringApplication.run(PensaApiApplication.class, args);
//     }
// }


// src/main/java/com/pensa/api/PensaApiApplication.java
// package com.pensa.api;

import com.pensa.api.migration.DiseaseMigrationService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class PensaApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(PensaApiApplication.class, args);
    }

    // 2. Defina um Bean CommandLineRunner para rodar o serviço
    @Bean
    public CommandLineRunner migrationRunner(DiseaseMigrationService migrationService) {
        return args -> {
            System.out.println(">>> INICIANDO MIGRAÇÃO DE DOENÇAS USSD PARA WEB...");
            
            // 3. Chama o método de migração
            migrationService.runMigration();
            
            System.out.println("<<< MIGRAÇÃO CONCLUÍDA NO CONTEXTO DE INICIALIZAÇÃO.");
            
            // Se esta for uma aplicação de migração *somente* e você quiser que ela pare
            // após a conclusão, você pode adicionar System.exit(0); aqui.
        };
    }
}