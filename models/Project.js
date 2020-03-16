const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    heroImage: String,
    liveSite: String,
    pageSpeedScore: String,
    heading: String,
    copy: String,
    firstImage: String,
    secondImage: String,
    thirdImage: String,
    technologies: Array,
    goals: Array,
    pains: Array,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
  },
  { timestamps: true }
);

ProjectSchema.methods.toJSON = function() {
  return {
    id: this.id,
    title: this.title,
    description: this.description,
    heroImage: this.heroImage,
    liveSite: this.liveSite,
    pageSpeedScore: this.pageSpeedScore,
    heading: this.heading,
    copy: this.copy,
    firstImage: this.firstImage,
    secondImage: this.secondImage,
    thirdImage: this.thirdImage,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    technologies: this.technologies,
    goals: this.goals,
    pains: this.pains
  };
};

mongoose.model('Project', ProjectSchema);
