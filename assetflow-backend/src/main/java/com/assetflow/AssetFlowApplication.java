package com.assetflow;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableJpaAuditing
@EnableScheduling
public class AssetFlowApplication {
    public static void main(String[] args) {
        SpringApplication.run(AssetFlowApplication.class, args);
        System.out.println("\n========================================");
        System.out.println("🚀 AssetFlow Backend is running!");
        System.out.println("========================================");
        System.out.println("📊 Swagger UI: http://localhost:8080/api/swagger-ui.html");
        System.out.println("🗄️  H2 Console: http://localhost:8080/api/h2-console");
        System.out.println("\n🔐 Default Credentials:");
        System.out.println("   Admin: admin@assetflow.com / password123");
        System.out.println("   Dept Head: priya@assetflow.com / password123");
        System.out.println("   Asset Manager: rahul@assetflow.com / password123");
        System.out.println("   Employee: sarah@assetflow.com / password123");
        System.out.println("========================================\n");
    }
}