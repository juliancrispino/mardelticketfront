// src/app/logic/imgur.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ImgurService {
  private clientId = '1183d3badb07a88';  // pega aquí tu Client-ID

  /**
   * Sube una imagen a Imgur y devuelve la URL pública.
   * @param file Archivo a subir.
   */
  async uploadImage(file: File): Promise<string> {
    // Convertimos a base64
    const base64 = await this.toBase64(file);
    // Hacemos POST a la API de Imgur
    const resp = await fetch('https://api.imgur.com/3/image', {
      method: 'POST',
      headers: {
        Authorization: `Client-ID ${this.clientId}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ image: base64.split(',')[1] })
    });
    const data = await resp.json();
    if (!resp.ok) {
      throw new Error(data.data?.error || 'Error al subir a Imgur');
    }
    return data.data.link;  // URL pública de la imagen
  }

  /** Helper: convierte File a data URL */
  private toBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = err => reject(err);
      reader.readAsDataURL(file);
    });
  }
}
