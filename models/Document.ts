// models/Document.ts
import mongoose, { Schema, model, models } from 'mongoose';

// Define the schema structure
const DocumentSchema = new Schema(
  {
    title: { type: String, required: false },
    content: { type: String, required: true }, // This will hold Tiptap's HTML or JSON string
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Export the model (avoid redefining if already exists)
const Document = models.Document || model('Document', DocumentSchema);

export default Document;
