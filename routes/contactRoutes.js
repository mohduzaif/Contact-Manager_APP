const express = require("express");
const contactRouter = express.Router();

const {
  getContacts,
  createContact,
  getIndividualContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");

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
