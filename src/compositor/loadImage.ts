export async function loadImage(src: string) {
    const image = new Image();
    
    image.crossOrigin = "anonymous";

    image.src = src;
    
    return new Promise<HTMLImageElement>((resolve, reject) => {
        image.addEventListener("load", () => resolve(image), { once: true });
        
        image.addEventListener("error", (error) => reject(error), { once: true });
    });
}