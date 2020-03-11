const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    heroImage: String,
    heading: String,
    copy: String,
    firstImage: String,
    secondImage: String,
    thirdImage: String
    // technologies: Array,
    // goals: Array,
    // pains: Array
  },
  { timestamps: true }
);

ProjectSchema.methods.toJSON = function() {
  return {
    id: this.id,
    title: this.title,
    description: this.description,
    heroImage: this.heroImage,
    heading: this.heading,
    copy: this.copy,
    image: this.image,
    goalsImage: this.goalsImage,
    painsImage: this.painsImage,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
    // technologies: this.technologies,
    // goals: this.goals,
    // pains: this.pains,
  };
};

mongoose.model('Project', ProjectSchema);
