import fs from 'fs';
import { Document } from 'mongoose';

export async function addToStorage(
  document: Document,
  file: File
): Promise<void> {
  return fs.promises.writeFile(document.toObject().path, file);
}

export function removeFromStorage(document: Document): Promise<void> {
  return fs.promises.unlink(document.toObject().path);
}
