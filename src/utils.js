// Generate random ID for pastes
export function generateId(length = 8) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Hash password using Web Crypto API
export async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Verify password
export async function verifyPassword(password, hash) {
  const passwordHash = await hashPassword(password);
  return passwordHash === hash;
}

// Check if paste is expired
export function isExpired(paste) {
  if (!paste.expiresAt) return false;
  return Date.now() > paste.expiresAt;
}

// Format date for display
export function formatDate(timestamp) {
  return new Date(timestamp).toLocaleString();
}

// Format time remaining
export function formatTimeRemaining(expiresAt) {
  if (!expiresAt) return '永不过期';

  const now = Date.now();
  const remaining = expiresAt - now;

  if (remaining <= 0) return '已过期';

  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

  if (days > 0) return `${days}天 ${hours}小时`;
  if (hours > 0) return `${hours}小时 ${minutes}分钟`;
  if (minutes > 0) return `${minutes}分钟`;
  return `${seconds}秒`;
}

// Validate paste ID
export function isValidPasteId(id) {
  return /^[a-zA-Z0-9_-]+$/.test(id) && id.length >= 3 && id.length <= 50;
}

// Sanitize HTML content
export function sanitizeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
