import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o arquivo App.tsx', () => {
  test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /Home/i });
    const aboutLink = screen.getByRole('link', { name: /About/i });
    const favoriteLink = screen.getByRole('link', { name: /Favorite Pokémon/i });

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();
  });

  test('Teste se a aplicação é redirecionada para a página inicial, na URL /, ao clicar no link Home da barra de navegação', async () => {
    const { user } = renderWithRouter(<App />, { route: '/about' });
    const homeLink = screen.getByRole('link', { name: /Home/i });
    await user.click(homeLink);
    expect(await screen.findByText(/Home/i)).toBeInTheDocument();
  });

  test('Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação', async () => {
    const { user } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /About/i });
    await user.click(aboutLink);
    expect(screen.getByRole('heading', { name: /About/i })).toBeInTheDocument();
  });

  test('Teste se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação', async () => {
    const { user } = renderWithRouter(<App />);
    const favoriteLink = screen.getByRole('link', { name: /Favorite Pokémon/i });
    await user.click(favoriteLink);
    expect(screen.getByRole('heading', { name: /Favorite Pokémon/i })).toBeInTheDocument();
  });

  test('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida', async () => {
    const { user } = renderWithRouter(<App />, { route: '/GABIGOL' });
    const notFound = screen.getByText(/Page requested not found/i);
    await user.click(notFound);
    expect(screen.getByRole('heading', { name: /Page requested not found/i })).toBeInTheDocument();
  });
});
