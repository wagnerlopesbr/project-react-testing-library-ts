import { screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import * as pokedexService from '../services/pokedexService';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o arquivo FavoritePokemon.tsx', () => {
  test('É exibida na tela a mensagem No favorite pokemon found caso a pessoa não tenha Pokémon favorito', () => {
    renderWithRouter(<App />, { route: '/favorites' });
    const favList = vi.spyOn(pokedexService, 'getFavoritePokemonList');
    expect(favList).toHaveLength(0);
    expect(screen.getByText(/No favorite Pokémon found/i)).toBeInTheDocument();
  });

  test('Apenas são exibidos os Pokémon favoritados', async () => {
    const { user } = renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: /More details/i });
    await user.click(moreDetailsLink);
    const favoritePokemon = await waitFor(() => screen
      .getByRole('checkbox', { name: /Pokémon favoritado?/i }));
    await user.click(favoritePokemon);
    const favPokemonLink = await waitFor(() => screen
      .getByRole('link', { name: /Favorite Pokémon/i }));
    await user.click(favPokemonLink);
    const pikachuText = await waitFor(() => screen.getByText(/Pikachu/i));
    expect(pikachuText).toBeInTheDocument();
  });
});
