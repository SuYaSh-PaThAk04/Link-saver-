import mongoose from 'mongoose';

const bookmarkSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  url: String,
  title: String,
  favicon: String,
  summary: String,
  createdAt: { type: Date, default: Date.now }
});

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);
export default Bookmark;
