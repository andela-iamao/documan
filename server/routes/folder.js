import express from 'express';
import auth from '../config/auth';
import { folders } from '../middlewares/validate';
import {
  createFolder,
  getAllFolders,
  getOneFolder,
  putDocument,
  removeDoc,
  folderDocs,
  updateFolder,
  deleteFolder
} from '../controllers/folder';
import { isAdmin } from '../helpers/helper';

const router = express.Router();

export default () => {
  router.route('/api/v1/folders')
    .get(auth, isAdmin, getAllFolders)
    .post(auth, folders, isAdmin, createFolder);
  router.route('/api/v1/folders/:id')
    .get(auth, isAdmin, getOneFolder)
    .put(auth, isAdmin, updateFolder)
    .delete(auth, isAdmin, deleteFolder);
  router.put('/api/v1/folders/:id/add', auth, isAdmin, putDocument);
  router.put('/api/v1/folders/:id/remove', auth, isAdmin, removeDoc);
  router.get('/api/v1/folders/:id/documents', auth, isAdmin, folderDocs);
  return router;
};
