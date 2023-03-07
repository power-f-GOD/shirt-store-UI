import { AxiosError } from 'axios';
import { Http } from '../http';

describe('Http', () => {
  describe('get', () => {
    it('makes a get request to the provided API URL (endpoint)', async () => {
      const get = jest.fn(Http.get);

      await expect(get('/')).rejects.toStrictEqual(
        new AxiosError('Network Error')
      );
      await expect(
        get
          .mockImplementation((url: string) => {
            console.log({ url });
            return Promise.resolve({ data: {}, statusCode: 302 });
          })
          .call(get, '/')
      ).resolves.toStrictEqual({ data: {}, statusCode: 302 });
    });
  });
});
