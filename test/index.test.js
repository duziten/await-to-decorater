import api from './api';

describe('await to decorater test', () => {
  it('should return res when resolve', async () => {
    const [err, res] = await api.getRightData();
    expect(err).toBeNull();
    expect(res[0].name).toEqual('javascript');
  });

  it('should return right value when resolve', async () => {
    const expectedVal = 24;

    const [err, res] = await api.getRightVal(expectedVal);
    expect(err).toBeNull();
    expect(res).toEqual(expectedVal);
  });

  it('should return an error when rejected', async () => {
    const msg = 'Error';

    const [err, res] = await api.getErrorData(msg);
    expect(err).toEqual('Error');
    expect(res).toBeUndefined();
  });

  it('should add external properties to the error object', async () => {
    const [err, res] = await api.getExternalError();

    expect(err).toBeTruthy();
    expect(err.extraKey).toEqual(24);
    expect(err.error).toEqual('Error message')
  });

});