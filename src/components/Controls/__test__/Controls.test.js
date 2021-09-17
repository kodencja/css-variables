import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import Controls from '../Controls';
import { ControlModalContext } from "../../../App";

afterEach(cleanup);

const renderWithProvider = (val) => {
    return render(
        <ControlModalContext.Provider value={val}>
            <Controls />
        </ControlModalContext.Provider>
    )
}

describe("Choose animation form", ()=>{
    test('should render the right form', async () => {
        // render(<Controls />);
        renderWithProvider({});

        const formElement = screen.getByTestId(/anim-choice/i);
        expect(formElement).toBeInTheDocument();
      });
})