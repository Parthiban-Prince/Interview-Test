import mongoose from "mongoose";

const PasteSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    ttl_seconds: {
        type: Number,
        required: true,
    },
    max_views: {
        type: Number,
        required: true,
    },
    created_At: {
        type: Date,
        default: Date.now,
    },
    expiresAt: {
        type: Date,
        default: null,
    },
    views:{
        type: Number,
        default: 0,
    }
});

const Paste = mongoose.model('Paste', PasteSchema);

export default Paste;