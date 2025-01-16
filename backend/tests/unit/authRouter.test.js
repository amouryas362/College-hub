const request = require("supertest");
const app = require("../../index");
const db = require('../../model/db');

describe("Signup Route", () => {

	afterAll(async () => {

		//delete the user created during the test
		await db.users.destroy({
			where: {
				email: "testEmail@gmail.com",
			},
		});

		//close the connection
		await db.sequelize.close();
		
	});

	test("POST /api/v1/signup should create a new user", async () => {
		const response = await request(app)
			.post("/api/v1/signup")
			.send({
				email: "testEmail@gmail.com",
				password: "password",
				username: "test_user",
			})
			.expect(201);

		expect(response.body.message).toBe("Account successfully created");
		expect(response.body).toHaveProperty("token");
	});

	test("POST /api/v1/signup should send a 409 response for duplicate email", async () => {
		const response = 
			await request(app).post("/api/v1/signup")
		.send({
			email: "testEmail@gmail.com",
			password: "password",
			username: "test_user",
		})
        .expect(409);
	});

    
});
