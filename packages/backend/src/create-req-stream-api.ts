import type { Express, Response } from 'express';

interface Req {
    on(eventName: 'data', listener: (chunk: Buffer) => void): void;
    on(eventName: 'end', listener: () => void): void;
    on(eventName: 'error', listener: (error: Error) => void): void;
}

export const createReqStreamApi = <T>(app: Express, path: string, handler: (req: Req, res: Response<T>) => void) => {
    app.post(path, handler);
};
