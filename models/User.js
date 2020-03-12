const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
   firstName: String,
   lastName: String,
   bio: String,
   education: String,
   jobDescription: String,
   github: String,
   linkedin: String,
   email: String,
   profileImageUrl: String,
  },
  { timestamps: true }
);

UserSchema.methods.toJSON = function() {
  return {
    firstName: this.firstName,
    lastName: this.lastName,
    bio: this.bio,
    education: this.education,
    jobDescription: this.jobDescription,
    github: this.github,
    linkedin: this.linkedin,
    email: this.email,
    profileImageUrl: this.profileImageUrl
  };
};

mongoose.model('User', UserSchema);
