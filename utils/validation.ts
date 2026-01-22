import { MAX_FILE_SIZE_MB, ALLOWED_MIME_TYPES } from '../constants';

export const validateFile = (file: File): { valid: boolean; error?: string } => {
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return { 
      valid: false, 
      error: `Invalid file type. Allowed: ${ALLOWED_MIME_TYPES.map(t => t.split('/')[1]).join(', ')}` 
    };
  }

  if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
    return { 
      valid: false, 
      error: `File too large. Max size is ${MAX_FILE_SIZE_MB}MB.` 
    };
  }

  return { valid: true };
};

export const sanitizeFileName = (fileName: string): string => {
  return fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
};
