import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class EncryptionService {
  private secretKey = 'mi_clave_secreta_123'; // Puedes mejorarla o moverla a una variable de entorno segura

  encrypt(data: any): string {
    const stringData = JSON.stringify(data);
    return CryptoJS.AES.encrypt(stringData, this.secretKey).toString();
  }

  decrypt(cipherText: string): any {
    const bytes = CryptoJS.AES.decrypt(cipherText, this.secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
  }
}
