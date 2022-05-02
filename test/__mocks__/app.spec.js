const customerController = require('../../src/controllers/customerController');
const request = require('supertest');
const mysql= require("mysql");
const { query } = require('express');
jest.mock('mysql');


const mockedConnection=
{
  connect:jest.fn(),
  on:jest.fn(),
  query:jest.fn()
}


mysql.createConnection.mockReturnValue(mockedConnection);




describe("Dummy test", () => {
    test('3+2 returns 5"', () => {
      expect(3+2).toBe(5);
    });
});


describe('Test Routes', function () {

  const app = require('../../src/app')


  test('responds to / doing a select on customer table', async () => {

    
    mockedConnection.query=jest.fn((sql,cb)=>cb(0,[]))

      await request(app)
      .get("/")
      .expect(200);

      console.log(mockedConnection.query.mock.calls)
      
      expect(mysql.createConnection).toHaveBeenCalled();
      expect(mockedConnection.connect).toHaveBeenCalled();
      expect(mockedConnection.query).toHaveBeenCalled();
      expect(mockedConnection.query.mock.calls[0][0]).toBe("SELECT * FROM customer");
  });

});