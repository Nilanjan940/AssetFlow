package com.assetflow;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class AssetFlowApplication {
    public static void main(String[] args) {
        SpringApplication.run(AssetFlowApplication.class, args);
        System.out.println("🚀 AssetFlow Backend is running!");
        System.out.println("📊 Swagger UI: http://localhost:8080/api/swagger-ui.html");
        System.out.println("🗄️  H2 Console: http://localhost:8080/api/h2-console");
        System.out.println("🔐 Default Admin: admin@assetflow.com / password123");
    }
}