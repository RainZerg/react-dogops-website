export default (url) => {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        // Если изображение уже загружено в кэше
        if (img.complete) {
            resolve();
        } else {
            // Обработчики успешной загрузки и ошибок
            img.onload = () => resolve();
            img.onerror = () => resolve(); // Игнорируем ошибки загрузки
        }
    });
};

