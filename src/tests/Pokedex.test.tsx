import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';
import App from '../App';

const pokeTest = 'pokemon-name';

describe('Testando o arquivo Pokedex.tsx', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />, { route: '/' });
    expect(screen.getByRole('heading', { name: /Encountered Pokémon/i })).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', async () => {
    const { user } = renderWithRouter(<App />, { route: '/' });
    const pokemon = screen.getByTestId(pokeTest);
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
    const pokemon = screen.getAllByTestId(pokeTest);
    expect(pokemon.length).toBe(1);
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />, { route: '/' });
    const buttons = screen.getAllByTestId('pokemon-type-button');
    const typeList = [
      'Electric', 'Fire', 'Bug',
      'Poison', 'Psychic', 'Normal', 'Dragon',
    ];
    buttons.forEach((button, index) => {
      expect(button).toHaveTextContent(typeList[index]);
    });
  });

  test('Após a seleção de um botão de tipo, a Pokédex deve circular somente pelos Pokémon daquele tipo', async () => {
    const { user } = renderWithRouter(<App />, { route: '/' });
    const buttons = screen.getAllByTestId('pokemon-type-button');
    const allButton = screen.getByRole('button', { name: 'All' });
    const fireButton = buttons[1];
    const bugButton = buttons[2];
    expect(allButton).toBeInTheDocument();
    await user.click(fireButton);
    const pokemon = screen.getByTestId(pokeTest);
    const nextButton = screen.getByRole('button', { name: 'Próximo Pokémon' });
    expect(pokemon).toHaveTextContent('Charmander');
    expect(allButton).toBeInTheDocument();
    await user.click(nextButton);
    expect(pokemon).toHaveTextContent('Rapidash');
    expect(allButton).toBeInTheDocument();
    await user.click(nextButton);
    expect(pokemon).toHaveTextContent('Charmander');
    expect(allButton).toBeInTheDocument();
    await user.click(bugButton);
    expect(pokemon).toHaveTextContent('Caterpie');
    expect(allButton).toBeInTheDocument();
    await user.click(allButton);
    expect(pokemon).toHaveTextContent('Pikachu');
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />, { route: '/' });
    const resetButton = screen.getByRole('button', { name: /All/i });
    expect(resetButton).toBeInTheDocument();
  });
});
