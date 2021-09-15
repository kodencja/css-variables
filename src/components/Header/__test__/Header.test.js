import { render, screen } from '@testing-library/react';
import Header from '../Header';


// GET BY
test('should render the same text into text prop', async () => {
  render(<Header text="React Rotate App" />);
  
  // below in brackets we omit capital letters
  const headingElement = screen.getByText(/react rotate app/i);
  expect(headingElement).toBeInTheDocument();
});

// it('should render the same role', async () => {
//     render(<Header text="React Rotate App" />);
    
//     // below in vrackets we omit capital letters
//     const headingElement = screen.getByRole("heading");
//     expect(headingElement).toBeInTheDocument();
//   });

// 3)
  it('should render the same role', async () => {
    render(<Header text="React Rotate App" />);
    
    // below in brackets we omit capital letters
    const headingElement = screen.getByRole("heading", {name: "React Rotate App"});
    expect(headingElement).toBeInTheDocument();
  });

  // 4)
  it('should render the same title into text prop', async () => {
    render(<Header title="React Rotate App" />);
    
    const headingElement = screen.getByTitle(/main/i);
    expect(headingElement).toBeInTheDocument();
  });

    // 5)
    it('should render the same testid into text prop', async () => {
      render(<Header title="React Rotate App" />);
      
      const headingElement = screen.getByTestId("header-1");
      expect(headingElement).toBeInTheDocument();
    });

    // FIND BY
// 1)
test('find - should render the same text into text prop', async () => {
  render(<Header text="React Rotate App" />);
  
  // below in brackets we omit capital letters
  const headingElement = await screen.findByText(/react rotate app/i);
  expect(headingElement).toBeInTheDocument();
});

// QUERY BY
it('QUERY - should render the same text into text prop', async () => {
  render(<Header text="React Rotate App" />);
  
  // below in brackets we omit capital letters
  const headingElement = screen.queryByText(/sky/i);
  // opposit query - check if THERE ISN'T 
  expect(headingElement).not.toBeInTheDocument();
});

it('should render all of the same role', async () => {
  render(<Header text="React Rotate App" />);
  
  // below in brackets we omit capital letters
  const headingElements = screen.getAllByRole("heading");
   
  expect(headingElements.length).toBe(2);
});