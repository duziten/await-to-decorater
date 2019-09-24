import Atd from '../src/index';

class DataService {
  @Atd()
  getRightData() {
    const data = [
      {
        id: '001',
        name: 'javascript'
      }
    ];
    return Promise.resolve(data);
  }

  @Atd()
  getRightVal = (val) => {
    return Promise.resolve(val);
  };

  @Atd()
  getErrorData(msg) {
    return Promise.reject(msg || 'get data error!');
  }

  @Atd({ extraKey: 24 })
  getExternalError(msg) {
    return Promise.reject({ error: 'Error message' });
  }
}

export default new DataService();
