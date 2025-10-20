import sharp from "sharp";
import { glob } from "glob";
import path from "path";
import fs from "fs";

// Define a pasta pública e o nível de qualidade
const PUBLIC_DIR = path.resolve(process.cwd(), "public");
const JPEG_QUALITY = 80;
const PNG_COMPRESSION_LEVEL = 6; // Nível de compressão para PNG (0-9)

async function compressImages() {
  console.log(`Iniciando a compressão de imagens em: ${PUBLIC_DIR}`);

  // Encontra todos os arquivos .jpg, .jpeg e .png dentro da pasta public e subpastas
  const files = await glob("**/*.{jpg,jpeg,png}", { cwd: PUBLIC_DIR });

  if (files.length === 0) {
    console.log("Nenhuma imagem encontrada para compressão.");
    return;
  }

  let compressedCount = 0;
  let totalSizeBefore = 0;
  let totalSizeAfter = 0;

  for (const file of files) {
    const fullPath = path.join(PUBLIC_DIR, file);
    const fileStats = fs.statSync(fullPath);
    totalSizeBefore += fileStats.size;

    try {
      let image = sharp(fullPath);
      const metadata = await image.metadata();

      // Lógica de compressão
      if (metadata.format === "jpeg" || metadata.format === "jpg") {
        // Aplica 80% de qualidade para JPEG/JPG (compressão lossy)
        image = image.jpeg({ quality: JPEG_QUALITY });
      } else if (metadata.format === "png") {
        // Aplica compressão moderada para PNG (compressão lossless)
        image = image.png({ compressionLevel: PNG_COMPRESSION_LEVEL });
      } else {
        // Ignora outros formatos ou aplica a compressão default
        console.log(
          `Aviso: Ignorando formato não suportado/não otimizado: ${file}`
        );
        continue;
      }

      // Otimiza e substitui o arquivo original
      await image.toFile(fullPath + ".optimized"); // Temporariamente
      fs.renameSync(fullPath + ".optimized", fullPath); // Substitui o original

      const newFileStats = fs.statSync(fullPath);
      totalSizeAfter += newFileStats.size;
      compressedCount++;
    } catch (error) {
      console.error(`Erro ao processar ${file}:`, error.message);
    }
  }

  const savedBytes = totalSizeBefore - totalSizeAfter;
  const savedKB = (savedBytes / 1024).toFixed(2);
  const savedMB = (savedBytes / 1024 / 1024).toFixed(2);

  console.log("--- Resumo da Compressão ---");
  console.log(`Imagens processadas: ${compressedCount} de ${files.length}`);
  console.log(`Tamanho total salvo: ${savedKB} KB (${savedMB} MB)`);
  console.log("Compressão concluída com sucesso!");
}

compressImages();

