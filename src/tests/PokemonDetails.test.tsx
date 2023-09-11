import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

const { name, id, summary, foundAt } = pokemonList[0];

describe('Testando o arquivo About.tsx', () => {
  test('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />, { route: `/pokemon/${id}` });
    const detailsH = screen.getByRole('heading', { name: `${name} Details` });
    expect(detailsH).toBeInTheDocument();
    const summaryH = screen.getByRole('heading', { name: 'Summary' });
    expect(summaryH).toBeInTheDocument();
    const summaryText = screen.getByText(summary);
    expect(summaryText).toBeInTheDocument();
    const detailsLink = screen.queryByRole('link', { name: /more details/i });
    expect(detailsLink).not.toBeInTheDocument();
  });

  test('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    renderWithRouter(<App />, { route: `/pokemon/${id}` });
    const locationsHeading = screen.getByRole('heading', { name: `Game Locations of ${name}` });
    expect(locationsHeading).toBeInTheDocument();
    foundAt.forEach((place, i) => {
      const { location, map } = place;
      const locationName = screen.getByText(location);
      expect(locationName).toBeInTheDocument();
      expect(locationName).toHaveTextContent(location);
      const mapImg = screen.getAllByAltText(`${name} location`);
      expect(mapImg[i]).toBeInTheDocument();
      expect(mapImg[i]).toHaveAttribute('src', map);
    });
  });

  test('Teste se o usuário pode favoritar um Pokémon por meio da página de detalhes', async () => {
    const { user } = renderWithRouter(<App />, { route: `/pokemon/${id}` });
    const favCheckbox = screen.getByLabelText('Pokémon favoritado?');
    let favImg = screen.queryByAltText(`${name} is marked as favorite`);
    expect(favImg).not.toBeInTheDocument();
    await user.click(favCheckbox);
    favImg = screen.queryByAltText(`${name} is marked as favorite`);
    expect(favImg).toBeInTheDocument();
    await user.click(favCheckbox);
    favImg = screen.queryByAltText(`${name} is marked as favorite`);
    expect(favImg).not.toBeInTheDocument();
  });
});
