// utils/imageUtils.ts
export const compressToWebP = (file: File, quality = 0.7): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();

      // FIX: handlers ANTES de setar o src.
      // Em mobile, o engine pode carregar a imagem antes do handler ser atribuído
      // (race condition) — o evento dispara, ninguém ouve, a Promise fica pendurada.
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");
        if (!ctx) return reject("Falha ao criar contexto do canvas");

        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (!blob) return reject("Falha na conversão para WebP");

            const webpFile = new File(
              [blob],
              file.name.replace(/\.[^/.]+$/, ".webp"),
              { type: "image/webp" },
            );
            resolve(webpFile);
          },
          "image/webp",
          quality,
        );
      };

      img.onerror = () =>
        reject("Falha ao carregar a imagem no elemento <img>");

      // src por último — só agora o browser começa a carregar
      img.src = event.target?.result as string;
    };

    reader.onerror = (error) => reject(error);
  });
};
