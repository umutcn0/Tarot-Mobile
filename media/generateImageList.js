const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'cards'); // Fotoğraf klasörü
const outputFilePath = path.join(__dirname, 'imageList.js'); // Çıkış dosyası

// Dosyaları listele
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.error('Klasör okunurken hata oluştu:', err);
  }

  // Sadece resim dosyalarını filtrele (jpg, png)
  const imageFiles = files.filter(file =>
    file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.jpeg')
  );

  // Her resim için bir obje oluştur
  const cards = imageFiles.map(file => {
    const name = path.basename(file, path.extname(file)); // Dosya adını uzantısız al
    return `{ name: "${name.toLowerCase()}", image: require('../media/cards/${file}') }`;
  });

  // Obje dizisini içeren dosya içeriği oluştur
  const imageListContent = `
export const cards = [
${cards.join(',\n')}
];
`;

  // Çıkış dosyasını yaz
  fs.writeFile(outputFilePath, imageListContent, err => {
    if (err) {
      return console.error('Dosya yazılırken hata oluştu:', err);
    }
    console.log('imageList.js başarıyla oluşturuldu!');
  });
});
