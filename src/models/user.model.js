import { Schema, model,mongoose } from 'mongoose';

const UserSchema = new Schema({
    Names: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    otp: {
        type: Number,
        required: true
    },
    otpExpires: {
        type: Date,
        required: false,
    },
    location:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'locations',
        required: false
    }],
    verified: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            delete ret.password;
            return ret;
        }
    },
    timestamps: true,
});

const userModel = model('user', UserSchema);

export default userModel;