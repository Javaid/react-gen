import { render, screen } from '@testing-library/react';
import Button from '../Button/PrimaryButton';

test('renders learn react link', () => {
  render(<Button title={"Sign in"} onClick={()=>{}}/>);
  const linkElement = screen.getByText(/Sign in/i);
  expect(linkElement).toBeInTheDocument();
});
