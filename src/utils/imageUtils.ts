// utils/imageUtils.ts
export const compressToWebP = (file: File, quality = 0.7): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file); //sempre retorna uma string

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");
        if (!ctx) return reject("Falha ao criar contexto do canvas");

        ctx.drawImage(img, 0, 0);

        // Aqui acontece a mágica: converte para WebP com a qualidade escolhida
        canvas.toBlob(
          (blob) => {
            if (!blob) return reject("Falha na conversão");
            // Cria um novo arquivo File com a extensão correta
            const webpFile = new File(
              [blob],
              file.name.replace(/\.[^/.]+$/, ".webp"),
              {
                type: "image/webp",
              },
            );
            resolve(webpFile);
          },
          "image/webp",
          quality,
        );
      };
    };
    reader.onerror = (error) => reject(error);
  });
};
