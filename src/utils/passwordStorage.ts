// src/utils/passwordStorage.ts
const STORAGE_KEY = 'encrypted_db_password';

function encryptPassword(password: string): string {
  // This is a very basic encryption and should not be considered secure
  return btoa(password);
}

function decryptPassword(encryptedPassword: string): string {
  // This is a very basic decryption and should not be considered secure
  return atob(encryptedPassword);
}

export function savePassword(password: string): void {
  const encryptedPassword = encryptPassword(password);
  localStorage.setItem(STORAGE_KEY, encryptedPassword);
}

export function getPassword(): string | null {
  const encryptedPassword = localStorage.getItem(STORAGE_KEY);
  if (encryptedPassword) {
    return decryptPassword(encryptedPassword);
  }
  return null;
}

export function clearPassword(): void {
  localStorage.removeItem(STORAGE_KEY);
}