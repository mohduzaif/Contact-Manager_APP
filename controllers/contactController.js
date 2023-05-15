const expressAsyncHandler = require("express-async-handler");
const contactModel = require("../models/contactModel");
// <----------If any async route get any exception it passed to errorHandler file--------->

// @desc Get all contacts Successfully
// @route GET /api/contacts
// @access public
const getContacts = expressAsyncHandler(async (req, res) => {
  let contact = await contactModel.find();
  // console.log(contact);
  // console.log(contact[0]._id);
  res.status(200).json({
    message: "Get all contacts Successfully",
    contact,
  });
});

// @desc Contact created Successfully
// @route POST /api/contacts
// @access public
const createContact = expressAsyncHandler(async (req, res) => {
  // console.log("The request body is : ", req.body);
  let { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  let userContact = await contactModel.create({
    name,
    email,
    phone,
  });
  console.log(userContact);
  res.status(201).json({
    message: "Contact Created Successfully",
  });
});

// @desc Get contact
// @route GET /api/contacts/:id
// @access public
const getIndividualContact = expressAsyncHandler(async (req, res) => {
  let currentContact = await contactModel.findById(req.params.id);
  console.log(currentContact);
  if (!currentContact) {
    res.status(404);
    throw new Error("Contact not Found");
  } else {
    res.status(201).json({
      message: "Get contact Successfully",
      currentContact,
    });
  }
});

// @desc Update contact for ${req.params.id}
// @route PUT /api/contacts/:id
// @access public
const updateContact = expressAsyncHandler(async (req, res) => {
  // Checked if contact is get or not.
  let currentContact = await contactModel.findById(req.params.id);
  if (!currentContact) {
    res.status(400).json({
      message: `Contact not Found for ${req.params.id}`,
    });
  }

  // update the contact.
  let updatedContact = await contactModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(201).json({
    message: "Contact Updated Successfully !",
    updatedContact,
  });
});

// @desc Delete contact for ${req.params.id}
// @route DELETE /api/contacts/:id
// @access public
const deleteContact = expressAsyncHandler(async (req, res) => {
  const currentContact = await contactModel.findById(req.params.id);
  // console.log(currentContact);
  if (!currentContact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  let deletedMessage = await contactModel.deleteOne({ "_id": req.params.id });
  console.log(deletedMessage);
  res.status(200).json({
    message: `Delete contact for ${req.params.id}`,
    deletedMessage,
    currentContact,
  });
});

module.exports = {
  getContacts,
  createContact,
  getIndividualContact,
  updateContact,
  deleteContact,
};
