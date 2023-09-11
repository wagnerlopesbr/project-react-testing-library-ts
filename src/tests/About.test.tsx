import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const imgSrc = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

describe('Testando o arquivo About.tsx', () => {
  test('Teste se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<App />, { route: '/about' });
    const aboutHeading = screen.getByRole('heading', { name: /About Pokédex/i });
    const aboutImage = screen.getByRole('img');
    expect(aboutHeading).toBeInTheDocument();
    expect(aboutImage).toHaveAttribute('src', imgSrc);
  });
});
