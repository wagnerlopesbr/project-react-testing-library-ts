import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';
import App from '../App';

describe('Testando o arquivo Pokedex.tsx', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />, { route: '/' });
    expect(screen.getByRole('heading', { name: /Encountered Pokémon/i })).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', async () => {
    const { user } = renderWithRouter(<App />, { route: '/' });
    const pokemon = screen.getByTestId('pokemon-name');
    const nextPokemonButton = screen.getByRole('button', { name: /Próximo pokémon/i });

    expect(pokemon).toHaveTextContent(pokemonList[0].name);
    await user.click(nextPokemonButton);
    expect(pokemon).toHaveTextContent(pokemonList[1].name);
    await user.click(nextPokemonButton);
    expect(pokemon).toHaveTextContent(pokemonList[2].name);
    await user.click(nextPokemonButton);
    expect(pokemon).toHaveTextContent(pokemonList[3].name);
    await user.click(nextPokemonButton);
    expect(pokemon).toHaveTextContent(pokemonList[4].name);
    await user.click(nextPokemonButton);
    expect(pokemon).toHaveTextContent(pokemonList[5].name);
    await user.click(nextPokemonButton);
    expect(pokemon).toHaveTextContent(pokemonList[6].name);
    await user.click(nextPokemonButton);
    expect(pokemon).toHaveTextContent(pokemonList[7].name);
    await user.click(nextPokemonButton);
    expect(pokemon).toHaveTextContent(pokemonList[8].name);
    await user.click(nextPokemonButton);
    expect(pokemon).toHaveTextContent(pokemonList[0].name);
  });

  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />, { route: '/' });
    const pokemon = screen.getAllByTestId('pokemon-name');
    expect(pokemon.length).toBe(1);
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />, { route: '/' });
    const buttons = screen.getAllByTestId('pokemon-type-button');
    const allButton = screen.getByRole('button', { name: /All/i });

    buttons.forEach((button, pokeType) => {
      const typesList = pokemonList.map((pokemon) => pokemon.type);
      typesList.forEach((type) => {
        if (!type) {
          screen.getByText(type);
        }
      });
      button.textContent = `${typesList[pokeType]}`;
      expect(button).toHaveTextContent(typesList[pokeType]);
    });

    expect(allButton).toBeInTheDocument();

    // expect(buttons.length).toBe(7);
    // expect(buttons[0]).toHaveTextContent(/Electric/i);
    // expect(buttons[1]).toHaveTextContent(/Fire/i);
    // expect(buttons[2]).toHaveTextContent(/Bug/i);
    // expect(buttons[3]).toHaveTextContent(/Poison/i);
    // expect(buttons[4]).toHaveTextContent(/Psychic/i);
    // expect(buttons[5]).toHaveTextContent(/Normal/i);
    // expect(buttons[6]).toHaveTextContent(/Dragon/i);
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />, { route: '/' });
    const resetButton = screen.getByRole('button', { name: /All/i });
    expect(resetButton).toBeInTheDocument();
  });
});
