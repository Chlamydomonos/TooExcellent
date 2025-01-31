import type { Express } from 'express';
import { createReqStreamApi } from '../../create-req-stream-api';
import type { UploadFileRes } from 'types/api/req-stream/upload-file';

export const handleUploadFileApi = (app: Express) =>
    createReqStreamApi<UploadFileRes>(app, '/upload-file', (req, res) => {
        // TODO;
    });
