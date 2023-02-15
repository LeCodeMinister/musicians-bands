const {sequelize} = require('./db');
const {Band, Musician} = require('./index')

describe('Band and Musician Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    })

    test('can create a Band', async () => {
        const testBand = await Band.create({ name: 'FakeBand', genre: 'Rap' });
    expect(testBand.name).toBe('FakeBand');
    expect(testBand.genre).toBe('Rap');
    })

    test('can create a Musician', async () => {
        const testMusician = await Musician.create({ name: 'FakeMusician', instrument: 'Piano' });
    expect(testMusician.name).toBe('FakeMusician');
    expect(testMusician.instrument).toBe('Piano');
    })
})