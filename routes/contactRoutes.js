const express = require("express");
const contactRouter = express.Router();

const {
  getContacts,
  createContact,
  getIndividualContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");

const validateToken = require("../middleware/validateTokenHandler");
// if we are using the same middleware for all the routers then we can done it using use() middleware.
contactRouter.use(validateToken);

contactRouter
  .route("/")
  .get(getContacts)
  .post(createContact);

contactRouter
  .route("/:id")
  .get(getIndividualContact)
  .put(updateContact)
  .delete(deleteContact);

module.exports = contactRouter;
