// not-found.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class NotFoundMiddleware implements NestMiddleware {
  use(req: Request, res: Response) {
    // 처리하려는 요청 경로가 없을 경우
    res.status(404).json({ message: 'Not Found' });
  }
}
