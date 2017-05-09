import db from '../models/index';
import errorRender from '../helpers/error-render';
import { paginate } from '../helpers/helper';

const Document = db.Document;

 /**
  * @class DocumentControllers
  */
class DocumentControllers {

  /**
   * createDocument - create a document
   * @param {Object} req - all properties of the request made to the server
   * @param {Object} res - server response object
   * @return {Object} - status of the processed request and a json object
   * to pass further information of the response
   */
  static createDocument(req, res) {
    const body = req.body;
    body.ownerId = req.decoded.id;
    Document.create(body)
      .then(result => res.status(200).json(result))
      .catch((errors) => {
        const error = errorRender(errors);
        res.status(error.status)
          .json({ error_code: error.error_code, message: error.message });
      });
  }

  /**
   * findAllDocument - find and retireve all documents on the platform
   * @param {Object} req - all properties of the request made to the server
   * @param {Object} res - server response object
   * @return {Object} - status of the processed request and a json object
   * to pass further information of the response
   */
  static findAllDocument(req, res) {
    let query;
    const limit = req.query.limit || 10;
    const offset = req.query.offset || 0;
    const attr = ['id', 'username', 'roleId'];
    if (req.isAdmin) {
      query = { where: {},
        include: [{
          model: db.Users,
          attributes: attr
        }] };
    } else {
      query = {
        where: { accessId: 1 },
        include: [{
          model: db.Users,
          attributes: attr
        }] };
    }
    Document.findAll(query)
      .then(documents => res.status(200).json(
        paginate(limit, offset, documents, 'documents')));
  }

  /**
   * findOneDocument - get and retur a single document belonging to the id
   * in the param
   * @param {Object} req - all properties of the request made to the server
   * @param {Object} res - server response object
   * @return {Object} - status of the processed request and a json object
   * to pass further information of the response
   */
  static findOneDocument(req, res) {
    Document.findById(req.params.id)
      .then((document) => {
        if (!document) {
          return res.status(404).json({ message: 'document not found' });
        } else if (req.decoded.id === document.ownerId || req.isAdmin) {
          return res.status(200).json(document);
        } else if (document.accessId === 1) {
          return res.status(200).json(document);
        }
        return res.status(401).json({
          message: 'You don\'t have permission to view this document'
        });
      }).catch((errors) => {
        const error = errorRender(errors);
        return res.status(error.status)
          .json({ error_code: error.error_code, message: error.message });
      });
  }

  /**
   * updateDocument - update a document
   * @param {Object} req - all properties of the request made to the server
   * @param {Object} res - server response object
   * @return {Object} - status of the processed request and a json object
   * to pass further information of the response
   */
  static updateDocument(req, res) {
    const message = 'An error occured';
    Document.findById(req.params.id)
      .then((document) => {
        if (!document) {
          return res.status(404).json({ message: 'document not found' });
        }
        if (document.ownerId === req.decoded.id) {
          document.update(req.body)
            .then(() => res.sendStatus(204))
            .catch(() => res.status(400).json({ message }));
        } else {
          res.status(401).json({
            message: 'You don\'t have permission to update this document'
          });
        }
      }).catch(() => res.status(400).json({ message }));
  }

  /**
   * deleteDocument - delete a document
   * @param {Object} req - all properties of the request made to the server
   * @param {Object} res - server response object
   * @return {Object} - status of the processed request and a json object
   * to pass further information of the response
   */
  static deleteDocument(req, res) {
    const message = 'An error occured';
    Document.findById(req.params.id)
      .then((document) => {
        if (!document) {
          return res.status(404).json({ message: 'document not found' });
        }
        if (document.ownerId === req.decoded.id || req.isAdmin) {
          document.destroy()
            .then(() => res.sendStatus(204))
            .catch(() => res.status(400).json({ message }));
        } else {
          return res.status(401).json({
            message: 'You don\'t have permission to delete this document'
          });
        }
      }).catch(() => res.status(400).json({ message }));
  }
}

export default DocumentControllers;
