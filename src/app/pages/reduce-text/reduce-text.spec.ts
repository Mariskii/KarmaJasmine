import { ReduceTextPipe } from "./reduce-text.pipe"

describe('ReduceTextPipe', () => {

  let pipe: ReduceTextPipe;

  beforeEach(() => {
    pipe = new ReduceTextPipe();
  });

  //Se instancia
  it('should be creater', () => {
    expect(pipe).toBeTruthy()
  });

  it('use transform correctly', () => {
    const text = 'Prueba para el pipe';
    const newText = pipe.transform(text,5);

    expect(newText.length).toBe(5);
  });

})
