import * as bcrypt from 'bcryptjs';
export const salt = bcrypt.genSaltSync(10);

export const USER_REPOSITORY = 'USER_REPOSITORY';
