import express from 'express';
import { folders } from '../middlewares/validate';
import FolderControllers from '../controllers/folder';
import { isAdmin } from '../middlewares/checkRoles';
import { verifyToken, isBlacklist } from '../middlewares/authenticate';

const router = express.Router();

export default () => {
  router.route('/api/v1/folders')
    .get(verifyToken,
      isBlacklist,
      isAdmin,
      FolderControllers.getAllFolders)
    .post(verifyToken,
      isBlacklist,
      folders,
      isAdmin,
      FolderControllers.createFolder);
  router.route('/api/v1/folders/:id')
    .get(verifyToken,
      isBlacklist,
      isAdmin,
      FolderControllers.getOneFolder)
    .put(verifyToken,
      isBlacklist,
      isAdmin,
      FolderControllers.updateFolder)
    .delete(verifyToken,
      isBlacklist,
      isAdmin,
      FolderControllers.deleteFolder);
  router.put('/api/v1/folders/:id/add',
    verifyToken,
    isBlacklist,
    isAdmin,
    FolderControllers.putDocument);
  router.put('/api/v1/folders/:id/remove',
    verifyToken,
    isBlacklist,
    isAdmin,
    FolderControllers.removeDoc);
  router.get('/api/v1/folders/:id/documents',
    verifyToken,
    isBlacklist,
    isAdmin,
    FolderControllers.folderDocs);
  return router;
};
