package com.explorer.explorer_api.config;

import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.context.annotation.Configuration;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;

@Configuration
@SecurityScheme(
    name = "bearerAuth",
    type = SecuritySchemeType.HTTP,
    scheme = "bearer",
    bearerFormat = "JWT",
    description = "JWT Authorization header using the Bearer scheme. Example: 'Authorization: Bearer {token}'"
)
@OpenAPIDefinition(
    info = @Info(title = "Explorer API", version = "v1"),
    servers = {
        @Server(url = "https://explorer.fractal-tess.xyz", description = "Production Server")
    }
)
public class OpenApiConfig {
} 