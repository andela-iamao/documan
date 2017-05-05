import db from '../models/index';
import { paginate } from '../helpers/helper';

const Folders = db.Folders;
const Document = db.Document;

/**
 * @class FolderControllers
 */
class FolderControllers {

  /**
   * createFolder - create a folder
   * @param {Object} req - all properties of the request made to the server
   * @param {Object} res - server response object
   * @return {Object} - status of the processed request and a json object
   * to pass further information of the response
   */
  static createFolder(req, res) {
    req.body.ownerId = req.decoded.id;
    Folders.findAll({ where: { title: req.body.title } })
      .then((folders) => {
        if (folders.length < 1) {
          Folders.create(req.body)
            .then(folder => res.status(200).json(folder));
        } else {
          res.status(409).json({ message: 'This folder already exists' });
        }
      });
  }

  /**
   * getAllFolders - get all folders belonging to user
   * @param {Object} req - all properties of the request made to the server
   * @param {Object} res - server response object
   * @return {Object} - status of the processed request and a json object
   * to pass further information of the response
   */
  static getAllFolders(req, res) {
    const limit = req.query.limit || 10;
    const offset = req.query.offset || 0;
    const ownerId = req.decoded.id;
    Folders.findAll({ where: { ownerId }, order: [['updatedAt', 'DESC']] })
      .then(folders =>
        res.status(200).json(paginate(limit, offset, folders, 'folders')))
      .catch(() =>
        res.status(400).json({ message: 'sorry an error occured' }));
  }

  /**
   * getOneFolder - get a single folder
   * @param {Object} req - all properties of the request made to the server
   * @param {Object} res - server response object
   * @return {Object} - status of the processed request and a json object
   * to pass further information of the response
   */
  static getOneFolder(req, res) {
    Folders.findById(req.params.id)
      .then((folder) => {
        if (!folder) {
          res.status(404).json({ message: 'folder does not exist' });
        } else if (req.decoded.id === folder.ownerId) {
          res.status(200).json(folder);
        } else {
          res.status(401).json({
            message: 'You don\'t have permission to view this folder'
          });
        }
      });
  }

  /**
   * updateFolder - update the folder's information
   * @param {Object} req - all properties of the request made to the server
   * @param {Object} res - server response object
   * @return {Object} - status of the processed request and a json object
   * to pass further information of the response
   */
  static updateFolder(req, res) {
    const message = 'update failed';
    if (req.body.ownerId) {
      return res.status(400).json({ message: 'you can only rename a folder' });
    }
    Folders.findAll({ where: { title: req.body.title } })
      .then((result) => {
        if (result.length >= 1) {
          res.status(409).json({ message: 'This folder already exists' });
        } else {
          Folders.findById(req.params.id)
            .then((folder) => {
              if (!folder) {
                return res.status(404)
                  .json({ message: 'folder does not exist' });
              } else if (req.decoded.id === folder.ownerId) {
                folder.update({ title: req.body.title })
                  .then(() => res.sendStatus(204))
                  .catch(() => res.status(400).json({ message }));
              } else {
                res.status(401).json({
                  message: 'You don\'t have permission to do this'
                });
              }
            }).catch(() => res.status(400).json({ message }));
        }
      });
  }

  /**
   * deleteFolder - delete a folder
   * @param {Object} req - all properties of the request made to the server
   * @param {Object} res - server response object
   * @return {Object} - status of the processed request and a json object
   * to pass further information of the response
   */
  static deleteFolder = (req, res) => {
    const message = 'delete failed';
    Folders.findById(req.params.id)
      .then((folder) => {
        if (!folder) {
          res.status(404).json({ message: 'folder does not exist' });
        } else if (req.decoded.id === folder.ownerId) {
          folder.destroy({ where: { id: req.params.id } })
            .then(() => res.sendStatus(204))
            .catch(() => res.status(400).json({ message }));
        } else {
          res.status(401).json({
            message: 'You don\'t have permission to do this'
          });
        }
      }).catch(() => res.status(400).json({ message }));
  }

  /**
   * putDocument - add a document to a folder
   * @param {Object} req - all properties of the request made to the server
   * @param {Object} res - server response object
   * @return {Object} - status of the processed request and a json object
   * to pass further information of the response
   */
  static putDocument(req, res) {
    const message = 'An error occured';
    Document.findById(req.body.id)
      .then((document) => {
        if (!document) {
          return res.status(404).json({ message: 'document not found' });
        }
        if (document.ownerId === req.decoded.id) {
          document.update({ folderId: req.params.id })
            .then(() => res.sendStatus(204))
            .catch(() => res.status(400).json({ message }));
        } else {
          res.status(401).json({
            message: 'You don\'t have permission to do this'
          });
        }
      }).catch(() => res.status(400).json({ message }));
  }

  /**
   * removeDoc - remove a document from a folder
   * @param {Object} req - all properties of the request made to the server
   * @param {Object} res - server response object
   * @return {Object} - status of the processed request and a json object
   * to pass further information of the response
   */
  static removeDoc(req, res) {
    const message = 'An error occured';
    Document.findById(req.body.id)
      .then((document) => {
        if (!document) {
          return res.status(404).json({ message: 'document not found' });
        }
        if (document.ownerId === req.decoded.id) {
          document.update({ folderId: null })
            .then(() => res.sendStatus(204))
            .catch(() => res.status(400).json({ message }));
        } else {
          res.status(401).json({
            message: 'You don\'t have permission to do this'
          });
        }
      }).catch(() => res.status(400).json({ message }));
  }

  /**
   * folderDocs - get and return all documents in a folder
   * @param {Object} req - all properties of the request made to the server
   * @param {Object} res - server response object
   * @return {Object} - status of the processed request and a json object
   * to pass further information of the response
   */
  static folderDocs(req, res) {
    const limit = req.query.limit || 18;
    const offset = req.query.offset || 0;
    Folders.findById(req.params.id)
      .then((folder) => {
        if (folder) {
          if (folder.ownerId === req.decoded.id) {
            Document.findAll({ where: { folderId: req.params.id } })
              .then((documents) => {
                res.status(200)
                  .json(paginate(limit, offset, documents, 'documents'));
              }).catch(() => res.status(400)
                .json({ message: 'An error occured' }));
          } else {
            res.status(401).json({
              message: 'You don\'t have permission to do this'
            });
          }
        } else {
          res.status(404).json({ message: 'folder not found' });
        }
      }).catch(error => res.status(400).json({ message: error.message }));
  }
}

export default FolderControllers;
