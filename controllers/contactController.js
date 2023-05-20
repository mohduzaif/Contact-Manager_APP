const expressAsyncHandler = require("express-async-handler");
const contactModel = require("../models/contactModel");
// <----------If any async route get any exception it passed to errorHandler file--------->

// @desc Get all contacts Successfully
// @route GET /api/contacts
// @access private
const getContacts = expressAsyncHandler(async (req, res) => {
  // console.log(req.user);
  let contact = await contactModel.find({user_id : req.user.id});
  // console.log(contact);
  // console.log(contact[0]._id);
  res.status(200).json({
    message: "Get all contacts Successfully",
    contact,
  });
});

// @desc Contact created Successfully
// @route POST /api/contacts
// @access private
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
    user_id : req.user.id,
  });
  // console.log(userContact);
  res.status(201).json({
    message: "Contact Created Successfully",
  });
});

// @desc Get contact
// @route GET /api/contacts/:id
// @access private
const getIndividualContact = expressAsyncHandler(async (req, res) => {
  let currentContact = await contactModel.findById(req.params.id);
  // console.log(currentContact);
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
// @access private
const updateContact = expressAsyncHandler(async (req, res) => {
  // Checked if contact is get or not.
  let currentContact = await contactModel.findById(req.params.id);
  if (!currentContact) {
    res.status(400).json({
      message: `Contact not Found for ${req.params.id}`,
    });
  }

  // check it is correct user that are update the contact.
  if(currentContact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have a permission to update other user contacts");
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
// @access private
const deleteContact = expressAsyncHandler(async (req, res) => {
  const currentContact = await contactModel.findById(req.params.id);
  // console.log(currentContact);
  if (!currentContact) {
    res.status(404);
    throw new Error("Contact not found");
  }

   // check it is correct user that are update the contact.
   if(currentContact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have a permission to delete other user contacts");
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
