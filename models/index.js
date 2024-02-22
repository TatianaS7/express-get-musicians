const Band = require('./Band')
const Musician = require('./Musician')

Musician.belongsTo(Band);
Band.belongsToMany(Musician, {through: 'bandMusicians'});

module.exports = {
    Band,
    Musician
};
