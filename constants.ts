import { Template } from './types';

// Default to environment variable if available, otherwise empty (will use window fallback or local storage)
export const DEFAULT_API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || '';

// Mock templates for the demo mode
export const MOCK_TEMPLATES: Template[] = [
  {
    id: 'vua_tuu_luong',
    name: 'Vua Tửu Lượng',
    description: 'Ngồi trên ngai vàng, đội vương miện và cười hào sảng.',
    thumbnailUrl: 'https://btstudio.vn/wp-content/uploads/sites/3/2026/01/Halida_A1.webp',
    genderSupported: ['male', 'female'],
  },
  {
    id: 'dung_si_diet_moi',
    name: 'Dũng Sĩ Diệt Mồi',
    description: 'Mặc giáp, vũ khí là đôi đũa dài, gắp mồi cực đỉnh.',
    thumbnailUrl: 'https://btstudio.vn/wp-content/uploads/sites/3/2026/01/Halida_A2.webp',
    genderSupported: ['male', 'female'],
  },
  {
    id: 'cay_hai_ban_nhau',
    name: 'Cây Hài Bàn Nhậu',
    description: 'Cosplay Charlie Chaplin, "thả miếng" không ngừng nghỉ.',
    thumbnailUrl: 'https://btstudio.vn/wp-content/uploads/sites/3/2026/01/Halida_A3.webp',
    genderSupported: ['male', 'female'],
  },
  {
    id: 'nghe_si_tai_nang',
    name: 'Nghệ Sĩ Tài Năng',
    description: 'Tóc Elvis, uống Halida xong quẩy hết mình trên sân khấu.',
    thumbnailUrl: 'https://btstudio.vn/wp-content/uploads/sites/3/2026/01/Halida_A4.webp',
    genderSupported: ['male', 'female'],
  },
  {
    id: 'bac_thay_dien_xuat',
    name: 'Bậc Thầy Diễn Xuất',
    description: 'Thần thái đỉnh cao, nhận tượng Oscar Voi Halida.',
    thumbnailUrl: 'https://btstudio.vn/wp-content/uploads/sites/3/2026/01/Halida_A5.webp',
    genderSupported: ['male', 'female'],
  },
];

export const MAX_FILE_SIZE_MB = 10;
export const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

// A stable sample video for mock results
export const MOCK_VIDEO_URL = 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4';
export const MOCK_POSTER_URL = 'https://picsum.photos/id/237/800/450';