import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

const { name } = pokemonList[0];

test('Teste se é renderizado um card com as informações de determinado Pokémon', () => {
  renderWithRouter(<App />);
  const pokeName = screen.getByTestId('pokemon-name');
  const pokeType = screen.getByTestId('pokemon-type');
  const pokeWeigth = screen.getByTestId('pokemon-weight');
  const pokeImg = screen.getByRole('img');
  const weightValue = pokemonList[0].averageWeight.value;
  const weightUnit = pokemonList[0].averageWeight.measurementUnit;
  expect(pokeName).toHaveTextContent(pokemonList[0].name);
  expect(pokeType).toHaveTextContent(pokemonList[0].type);
  expect(pokeWeigth).toHaveTextContent(`Average weight: ${weightValue} ${weightUnit}`);
  expect(pokeImg).toHaveAttribute('src', pokemonList[0].image);
  expect(pokeImg).toHaveAttribute('alt', `${name} sprite`);
});

test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes desse Pokémon', async () => {
  const { user } = renderWithRouter(<App />);
  const detailsLink = screen.getByRole('link', { name: /More details/i });
  expect(detailsLink).toHaveAttribute('href', `/pokemon/${pokemonList[0].id}`);
  await user.click(detailsLink);
  const pokemonDetails = screen.getByRole('heading', { name: /Pikachu details/i });
  expect(pokemonDetails).toBeInTheDocument();
  expect(window.location.pathname).toBe(`/pokemon/${pokemonList[0].id}`);
});

test('Teste se, ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', async () => {
  const { user } = renderWithRouter(<App />, { route: `/pokemon/${pokemonList[0].id}` });
  const favCheckbox = screen.getByRole('checkbox');
  await user.click(favCheckbox);
  const favImg = screen.getByAltText(`${name} is marked as favorite`);
  expect(favImg).toBeInTheDocument();
});
