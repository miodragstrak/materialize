// Client-side utility to extract a QR code string from an image `File`.
// Strategy:
// 1. Try the browser `BarcodeDetector` API if available.
// 2. Dynamically import `jsqr` as a fallback if installed in the project.
// Returns the decoded QR string or `null` if not found.
export async function extractQRFromImage(file: File): Promise<string | null> {
  if (!file) return null;

  const blobUrl = URL.createObjectURL(file);

  try {
    const img = await loadImageElement(file, blobUrl);

    const canvas = document.createElement('canvas');
    canvas.width = img.width || (img as any).naturalWidth || 1024;
    canvas.height = img.height || (img as any).naturalHeight || 1024;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.drawImage(img as any, 0, 0, canvas.width, canvas.height);

    // 1) Native BarcodeDetector
    const NativeBD = (globalThis as any).BarcodeDetector;
    if (NativeBD && typeof NativeBD === 'function') {
      try {
        const detector = new NativeBD({ formats: ['qr_code'] });
        const detections = await detector.detect(canvas as any);
        if (detections && detections.length > 0) {
          return detections[0].rawValue ?? null;
        }
      } catch (err) {
        // ignore and try fallback
      }
    }

    // 2) Fallback to jsQR if available
    try {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const jsqr = await import('jsqr').then((m) => (m && (m as any).default) || m);
      if (typeof jsqr === 'function') {
        const qr = jsqr(imageData.data, imageData.width, imageData.height);
        return qr?.data ?? null;
      }
    } catch (err) {
      // jsqr not installed or failed — return null
    }

    return null;
  } finally {
    URL.revokeObjectURL(blobUrl);
  }
}

async function loadImageElement(file: File, blobUrl: string): Promise<HTMLImageElement> {
  // Prefer createImageBitmap where available for performance
  if ('createImageBitmap' in window) {
    try {
      const bitmap = await createImageBitmap(file);
      // draw bitmap to an offscreen canvas and create an Image element for consistent handling
      const c = document.createElement('canvas');
      c.width = bitmap.width;
      c.height = bitmap.height;
      const ctx = c.getContext('2d')!;
      ctx.drawImage(bitmap, 0, 0);
      const img = new Image();
      img.src = c.toDataURL();
      await new Promise<void>((res) => (img.onload = () => res()));
      return img;
    } catch (err) {
      // fall back to Image element below
    }
  }

  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = blobUrl;
  });
}

export default extractQRFromImage;
