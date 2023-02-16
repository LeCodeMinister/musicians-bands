const {Band} = require('./Band')
const {Musician} = require('./Musician')
const {Song} = require('./Song')

Musician.belongsTo(Band);
Band.hasMany(Musician);

Band.belongsToMany(Song, {through: "song_band_junction"});
Song.belongsToMany(Band, {through: "song_band_junction"});

module.exports = {
    Band,
    Musician,
    Song
};
