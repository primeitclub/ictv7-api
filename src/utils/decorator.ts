import { SetMetadata } from '@nestjs/common';

export const IS_ADMIN_KEY = 'inAdmin';
export const IsAdmin = () => SetMetadata(IS_ADMIN_KEY, true);

export const IS_Public_KEY = 'inPublic';
export const IsPublic = () => SetMetadata(IS_Public_KEY, true);
