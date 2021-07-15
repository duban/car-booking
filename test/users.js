let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Car Book API', () => {
    describe("POST /login", () => {
        it("Login success", (done) => {
            const user = {
                email: "mikael@mail.com",
                password: "password123"
            };
            chai.request(server)
                .post("/api/v1/login")
                .send(user)
                .end((err, response) => {
                    response.should.have.status(201);
                    response.body.should.be.a('object');
                    // response.body.should.have.property('id').eq(4);
                    // response.body.should.have.property('name').eq("Task 4");
                    // response.body.should.have.property('completed').eq(false);
                    done();
                });
        });

        it("Login failed", (done) => {
            const user = {
                email: "mikael@mail.com",
                password: "password12"
            };
            chai.request(server)
                .post("/api/v1/login")
                .send(user)
                .end((err, response) => {
                    response.should.have.status(401);
                    response.body.should.be.a('object');
                    // response.body.should.have.property('id').eq(4);
                    // response.body.should.have.property('name').eq("Task 4");
                    // response.body.should.have.property('completed').eq(false);
                    done();
                });
        });
    });

});


