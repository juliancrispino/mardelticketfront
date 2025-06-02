import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CloudinaryService {
  private cloudName = environment.cloudinary.cloudName;
  private unsignedUploadPreset = environment.cloudinary.unsignedUploadPreset;

  /**
   * Sube un archivo y devuelve la URL segura.
   */
  async uploadImage(file: File): Promise<string> {
    const url = `https://api.cloudinary.com/v1_1/${this.cloudName}/upload`;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.unsignedUploadPreset);

    const resp = await fetch(url, {
      method: 'POST',
      body: formData
    });

    if (!resp.ok) {
      const err = await resp.json();
      throw new Error(`Cloudinary upload error: ${err.error?.message || resp.statusText}`);
    }

    const data = await resp.json();
    return data.secure_url;  // URL pública y segura
  }
}
