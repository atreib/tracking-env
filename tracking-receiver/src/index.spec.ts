import { example } from './teste';

describe('Example', () => {
  it('SHould example', () => {
    const response = example();
    expect(response).toEqual('teste');
  });
});
