package com.pensa.api.services;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class FileStorageService {
    
    private String uploadDir = "uploads/";
    
    public String storeFile(MultipartFile file, String directory) {
        try {
            if (file.isEmpty()) {
                throw new RuntimeException("Arquivo vazio não pode ser armazenado");
            }
            
            // Create directory if it doesn't exist
            Path dirPath = Paths.get(uploadDir + directory);
            if (!Files.exists(dirPath)) {
                Files.createDirectories(dirPath);
            }
            
            // Generate unique filename
            String originalFilename = file.getOriginalFilename();
            String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            String filename = System.currentTimeMillis() + "_" + UUID.randomUUID().toString() + extension;
            
            Path targetPath = dirPath.resolve(filename);
            Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);
            
            return directory + "/" + filename;
            
        } catch (IOException ex) {
            throw new RuntimeException("Não foi possível armazenar o arquivo. Erro: " + ex.getMessage());
        }
    }
    
    public void deleteFile(String filePath) {
        try {
            Path path = Paths.get(uploadDir + filePath);
            Files.deleteIfExists(path);
        } catch (IOException ex) {
            // Log error but don't throw exception
            System.err.println("Erro ao deletar arquivo: " + ex.getMessage());
        }
    }
    
    public boolean fileExists(String filePath) {
        Path path = Paths.get(uploadDir + filePath);
        return Files.exists(path);
    }
}