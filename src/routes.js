import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import ExcelController from './App/Controllers/ExcelController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/files', upload.single('file'), ExcelController.store);

export default routes;
