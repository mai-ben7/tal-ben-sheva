const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// תיקיית התמונות המקורית
const inputDir = path.join(__dirname, '../public/pictures');
// תיקיית התמונות החדשות
const outputDir = path.join(__dirname, '../public/pictures-optimized');

// יצירת התיקייה החדשה אם היא לא קיימת
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// רשימת התמונות להמרה
const imagesToConvert = [
  'tal-portrait.png',
  'IMG_3648.jpeg',
  'IMG_4064.jpeg',
  'IMG_4094.jpeg',
  'IMG_4123.jpeg',
  'IMG_4327.jpeg',
  'IMG_4397.jpeg',
  'IMG_4402.jpeg',
  'IMG_4417.jpeg',
  'IMG_4425.jpeg',
  'IMG_4426.jpeg',
  'IMG_4431.jpeg',
  'IMG_4432.jpeg'
];

async function convertImages() {
  console.log('🚀 מתחיל המרת תמונות...');
  
  for (const imageName of imagesToConvert) {
    const inputPath = path.join(inputDir, imageName);
    const baseName = path.parse(imageName).name;
    
    // בדיקה שהקובץ קיים
    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  קובץ לא נמצא: ${imageName}`);
      continue;
    }
    
    try {
      // המרה ל-WebP
      const webpPath = path.join(outputDir, `${baseName}.webp`);
      await sharp(inputPath)
        .webp({ quality: 85, effort: 6 })
        .toFile(webpPath);
      
      // המרה ל-AVIF
      const avifPath = path.join(outputDir, `${baseName}.avif`);
      await sharp(inputPath)
        .avif({ quality: 80, effort: 4 })
        .toFile(avifPath);
      
      console.log(`✅ הומר בהצלחה: ${imageName}`);
      
      // הצגת גודל הקבצים
      const originalSize = fs.statSync(inputPath).size;
      const webpSize = fs.statSync(webpPath).size;
      const avifSize = fs.statSync(avifPath).size;
      
      console.log(`   📊 גודל מקורי: ${(originalSize / 1024).toFixed(1)}KB`);
      console.log(`   📊 WebP: ${(webpSize / 1024).toFixed(1)}KB (${((1 - webpSize/originalSize) * 100).toFixed(1)}% חיסכון)`);
      console.log(`   📊 AVIF: ${(avifSize / 1024).toFixed(1)}KB (${((1 - avifSize/originalSize) * 100).toFixed(1)}% חיסכון)`);
      
    } catch (error) {
      console.error(`❌ שגיאה בהמרת ${imageName}:`, error.message);
    }
  }
  
  console.log('🎉 סיום המרת התמונות!');
  console.log(`📁 התמונות החדשות נמצאות ב: ${outputDir}`);
}

convertImages().catch(console.error);
