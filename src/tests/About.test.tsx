import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const imgSrc = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

describe('Testando o arquivo About.tsx', () => {
  test('Teste se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<App />, { route: '/about' });
    const aboutImage = screen.getByRole('img');
    expect(aboutImage).toHaveAttribute('src', imgSrc);
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<App />, { route: '/about' });
    const aboutHeading = screen.getByRole('heading', { name: /About Pokédex/i });
    expect(aboutHeading).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<App />, { route: '/about' });
    const aboutHeading = screen.getAllByRole('heading');
    expect(aboutHeading.length).toBeGreaterThan(2);
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex: https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png', () => {
    renderWithRouter(<App />, { route: '/about' });
    const aboutImage = screen.getByRole('img');
    expect(aboutImage).toHaveAttribute('src', imgSrc);
  });
});
