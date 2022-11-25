import { respond } from "../../common/response";

test('Responses is an object', () => {
    expect(typeof respond).toBe('function');
});

test('200 works', () => {
    const res = respond(200, "random details");
    expect(res.statusCode).toBe(200);
    expect(typeof res.body).toBe('string');
    expect(res.headers['Content-Type']).toBe('application/json');
});