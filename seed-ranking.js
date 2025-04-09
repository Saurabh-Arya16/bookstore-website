// seed-ranking.js
const mongoose = require('mongoose');
const Ranking = require('./models/Ranking');

mongoose.connect('mongodb://localhost:27017/bookstore', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const rankings = [
  { bookTitle: 'Maths', views: 120 },
  { bookTitle: 'MongoDB in Action', views: 95 },
  { bookTitle: 'Node.js Mastery', views: 110 },
  { bookTitle: 'English', views: 85 },
  { bookTitle: 'Computer Science', views: 105 },
  { bookTitle: 'Science', views: 90 },
  { bookTitle: 'PHP', views: 70 },
  { bookTitle: 'SQL', views: 100 },
  { bookTitle: 'Harry Potter', views: 150 },
  { bookTitle: 'Lord of the Rings', views: 130 },
  { bookTitle: 'Invisible Man', views: 80 },
  { bookTitle: 'Web Development', views: 98 },
];

const seedRankings = async () => {
  try {
    await Ranking.deleteMany({});
    await Ranking.insertMany(rankings);
    console.log('Ranking data seeded');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding ranking:', error);
  }
};

seedRankings();
