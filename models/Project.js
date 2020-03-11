const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    heroImage: String,
    // technologies: Array,
    heading: String,
    copy: String,
    firstImage: String,
    // goals: Array,
    secondImage: String,
    // pains: Array,
    thirdImage: String
  },
  { timestamps: true }
);

ProjectSchema.methods.toJSON = function() {
  return {
    id: this.id,
    title: this.title,
    description: this.description,
    heroImage: this.heroImage,
    // technologies: this.technologies,
    heading: this.heading,
    copy: this.copy,
    image: this.image,
    // goals: this.goals,
    goalsImage: this.goalsImage,
    // pains: this.pains,
    painsImage: this.painsImage,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

mongoose.model('Project', ProjectSchema);
