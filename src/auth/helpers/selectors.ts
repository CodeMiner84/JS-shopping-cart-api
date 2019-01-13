import { createParamDecorator } from '@nestjs/common';

export const GetLoggedUser = createParamDecorator((data, req) => {
  return req.user !== null ? req.user : null;
});
