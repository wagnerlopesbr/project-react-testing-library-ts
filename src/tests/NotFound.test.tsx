import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o arquivo NotFound.tsx', () => {
  test('Teste se a página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<App />, { route: '/GABIGOL' });
    expect(screen.getByText(/Page requested not found/i)).toBeInTheDocument();
  });

  test('Teste se a página mostra a imagem com o texto alternativo https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    renderWithRouter(<App />, { route: '/GABIGOL' });
    const notFoundImgAltText = screen.getByAltText(/Clefairy pushing buttons randomly with text I have no idea what i'm doing/i);
    expect(notFoundImgAltText).toBeInTheDocument();
  });
});
