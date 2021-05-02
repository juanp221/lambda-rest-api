const validator = require('../../../lambda-layer/helpers/validator');
const get_data = require('../get_testing');

var Event =  {
    department: "Mi dependencia" 
}
var MockedValidatorResponse = {
    result: 'valid'
}
var SuccessResponse = {
    status: 'Error',
    message: "Missing required key 'TableName' in params"
}
/**
 * @description Unit test for the handler function
 */
 describe("handlerValidarUsuario", async () => {

    it(`Should output "Error for Input Invalid Params"`, async () => {
        var event = Event;
        var expectedResponse = SuccessResponse;
        var mockedValidar = MockedValidatorResponse;
        var mockValidarUsuario = jest.spyOn(validator, "validate").mockReturnValueOnce(mockedValidar); 
        var response = await get_data.lambdaHandler(event,{});
        expect(mockValidarUsuario).toHaveBeenCalled();
        expect(response).toEqual(expectedResponse);
        mockValidarUsuario.mockRestore();
    });

});