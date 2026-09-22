/**
 * THƯ MỤC IMAGIE TOÀN BỘ HỆ THỐNG (/src/imagie)
 * Tập hợp và quản lý tập trung tất cả hình ảnh giày, banner, avatar và preset
 */

import { SHOE_IMAGES } from './shoes';
import { AVATAR_IMAGES } from './avatars';
import { BANNER_IMAGES, HERO_IMAGES } from './banners';
import { DEMO_PRESET_IMAGES } from './presets';

export * from './shoes';
export * from './avatars';
export * from './banners';
export * from './presets';

// Đối tượng tập hợp toàn bộ hình ảnh
export const APP_IMAGES = {
  shoes: SHOE_IMAGES,
  banners: BANNER_IMAGES,
  hero: HERO_IMAGES,
  avatars: AVATAR_IMAGES,
  presets: DEMO_PRESET_IMAGES,
};

export default APP_IMAGES;
