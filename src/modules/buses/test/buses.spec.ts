import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import { Car } from '../models/car';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Car API', () => {
  before(async () => {
    await sequelize.sync({ force: true });
  });

  describe('POST /cars', () => {
    it('should create a new car', async () => {
      const res = await chai.request(app)
        .post('/cars')
        .send({
          name: 'Car 1',
          make: 'Make 1',
          model: 'Model 1',
          year: 2022,
        });

      expect(res).to.have.status(201);
      expect(res.body).to.have.property('id');
      expect(res.body.name).to.equal('Car 1');
      expect(res.body.make).to.equal('Make 1');
      expect(res.body.model).to.equal('Model 1');
      expect(res.body.year).to.equal(2022);
    });

    it('should not create a new car with invalid data', async () => {
      const res = await chai.request(app).post('/cars').send({
        name: 'Car 2',
        make: 'Make 2',
        model: 'Model 2',
        // missing year property
      });

      expect(res).to.have.status(400);
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.equal('Invalid input data');
    });
  });

  describe('GET /cars', () => {
    before(async () => {
      await Car.bulkCreate([
        {
          name: 'Car 1',
          make: 'Make 1',
          model: 'Model 1',
          year: 2022,
        },
        {
          name: 'Car 2',
          make: 'Make 2',
          model: 'Model 2',
          year: 2023,
        },
      ]);
    });

    it('should get a list of all cars', async () => {
      const res = await chai.request(app).get('/cars');

      expect(res).to.have.status(200);
      expect(res.body).to.have.lengthOf(2);
      expect(res.body[0].name).to.equal('Car 1');
      expect(res.body[1].name).to.equal('Car 2');
    });

    it('should get a car by id', async () => {
      const cars = await Car.findAll();
      const carId = cars[0].id;

      const res = await chai.request(app).get(`/cars/${carId}`);

      expect(res).to.have.status(200);
      expect(res.body.id).to.equal(carId);
      expect(res.body.name).to.equal('Car 1');
      expect(res.body.make).to.equal('Make 1');
      expect(res.body.model).to.equal('Model 1');
      expect(res.body.year).to.equal(2022);
    });

    it('should return 404 when car is not found', async () => {
      const carId = 999; // invalid id

      const res = await chai.request(app).get(`/cars/${carId}`);

      expect(res).to.have.status(404);
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.equal(`Car with id ${carId} not found`);
    });
  });