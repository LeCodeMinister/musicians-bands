const {sequelize} = require('./db');
const {Band, Musician, Song} = require('./index')
describe('Band and Musician Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeEach(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({force: true});
    })

    // test('can create a Band', async () => {
    //     const testBand = await Band.create({ name: 'FakeBand', genre: 'Rap' });
    //     expect(testBand.name).toBe('FakeBand');
    //     expect(testBand.genre).toBe('Rap');
    // })

    // test('can create a Musician', async () => {
    //     const testMusician = await Musician.create({ name: 'FakeMusician', instrument: 'Piano' });
    //     expect(testMusician.name).toBe('FakeMusician');
    //     expect(testMusician.instrument).toBe('Piano');
    // })

    // test('can add multiple musicians', async () => {
    //     await sequelize.sync({ force:true });
    //     const testBand1 = await Band.create({ name: 'FakeMusiciansBand', genre: 'Hip Hop' });

    //     const testMusician1 = await Musician.create({ name: 'FakeMusician1', instrument: 'Piano' });
    //     const testMusician2 = await Musician.create({ name: 'FakeMusician2', instrument: 'Flute' });

    //     await testBand1.addMusician(testMusician1);
    //     await testBand1.addMusician(testMusician2);

    //     let testBand1Musicians = await testBand1.getMusicians();
    //     let testBand1Musician1 = await Musician.findByPk(1);
    //     // expect(testBand1Musicians[0] instanceof Musician).toBeTruthy;
    //     expect(testBand1Musician1.BandId).toBe(1);
    // })
    // test('can create a Song', async () => {
    //     await Song.create({ title: 'FakeSong', year: 2023 });
    //     const testSong = await Song.findByPk(1);
    //     expect(testSong.title).toBe('FakeSong');
    //     expect(testSong.year).toBe(2023);
    // })
    // test('can add multiple songs', async () => {
    //     await sequelize.sync({force: true});
    //     const testBand1 = await Band.create({ name: 'FakeMusiciansBand1', genre: 'Hip Hop' });
    //     const testBand2 = await Band.create({ name: 'FakeMusiciansBand2', genre: 'Heavy Metal' });

    //     const testSong1 = await Song.create({title: "FakeSong1", year: 2013})
    //     const testSong2 = await Song.create({title: "FakeSong2", year: 2014})

    //     await testBand1.addSongs([testSong1, testSong2]);
    //     const testBand1Songs = await testBand1.getSongs();
    //     expect(testBand1Songs.length).toBe(2);
        
    //     await testBand2.addSong(testSong1);
    //     const testSong1Bands = await testSong1.getBands();
    //     expect(testSong1Bands.length).toBe(2);
    //     const testSong2Bands = await testSong2.getBands();
    //     expect(testSong2Bands.length).toBe(1);
    // })

    test('Musicians can be eager-loaded with Bands', async () => {
        await Band.bulkCreate([
            {name: "Band1", genre: "Genre1"}, 
            {name: "Band2", genre: "Genre2"},
            {name: "Band3", genre: "Genre3"},
            {name: "Band4", genre: "Genre4"},
            {name: "Band5", genre: "Genre5"}
        ]);
        await Musician.bulkCreate([
            {name: "Musician1", instrument: "Instrument1"}, 
            {name: "Musician2", instrument: "Instrument2"},
            {name: "Musician3", instrument: "Instrument3"},
            {name: "Musician4", instrument: "Instrument4"},
            {name: "Musician5", instrument: "Instrument5"}
        ]);
        
        let band1 = await Band.findByPk(1);
        let musician1 = await Musician.findByPk(1);
        let musician2 = await Musician.findByPk(2);
        let musician3 = await Musician.findByPk(3);
        let musician4 = await Musician.findByPk(4);

        await band1.addMusicians([musician1, musician2, musician3, musician4]);
        
        const wholeBandWithMusicians = await Band.findAll({
          include: [{
            model: Musician, as: "Musicians"
          }]
        });

        expect(wholeBandWithMusicians[0].Musicians.length).toBe(4);
        expect(wholeBandWithMusicians[0].Musicians[0].name).toBe("Musician1");
        expect(wholeBandWithMusicians[0].Musicians[2].instrument).toBe("Instrument3");
        expect(wholeBandWithMusicians[1].Musicians.length).toBe(0);
    });
})