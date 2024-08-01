import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertImageBufferToSrc(imageBuffer: ArrayBuffer) {
  const imageBase64 = Buffer.from(imageBuffer).toString('base64');
  return `data:image/jpeg;base64,${imageBase64}`;
}