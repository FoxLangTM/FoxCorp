/**
 * FoxCorp Navigation Worker
 */
self.onmessage = async (event) => {
    const { action, url } = event.data;

    if (action === 'VALIDATE_URL') {
        try {
            const validatedUrl = await processNavigation(url);
            self.postMessage({
                action: 'VALIDATE_URL',
                status: 'OK',
                url: validatedUrl
            });
        } catch (err) {
            self.postMessage({
                action: 'VALIDATE_URL',
                status: 'ERROR',
                error: err.message
            });
        }
    }
};

async function processNavigation(url) {
    if (!url) throw new Error("Brak adresu URL");
    const parsed = new URL(url);
    if (parsed.protocol === 'http:') {
        console.warn(`Niebezpieczne połączenie: ${url}`);
    }
    // Opcjonalna analiza nagłówków przed otwarciem
    await new Promise(resolve => setTimeout(resolve, 50)); 
    return url;
}
