import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import Controls from "../Controls";
import { ControlModalContext } from "../../../App";

afterEach(cleanup);

const renderWithProvider = (val) => {
  return render(
    <ControlModalContext.Provider value={val}>
      <Controls />
    </ControlModalContext.Provider>
  );
};

describe("Choose animation form", () => {
  const mockedState = {
    onChanging: jest.fn(),
    onValue: {
      blur: "0",
      color: "#f7f9d0",
      bgrCol: "#527198",
      skew: 10,
      skewChanged: false,
      rotatex: 0,
      rotatey: 10,
      rotatez: 15,
      spacing: 10,
      transOrigX: 50,
      transOrigY: 50,
      transOrigZ: 0,
      currentAnimation: "animRotateXYZ",
      modalIsOpen: false,
      outputStyle: false,
    },
    onOutputStyle: jest.fn(),
  };

  test("should render the right form", async () => {

    renderWithProvider({});

    const formElement = screen.getByTestId(/anim-choice/i);
    expect(formElement).toBeInTheDocument();
  });

  it("should have hide text content when initially rendered", () => {
    renderWithProvider(mockedState);
    const btnMenu = screen.getByTestId("btn-menu");

    expect(btnMenu).toHaveTextContent(/hide/i);
    expect(btnMenu).not.toHaveTextContent(/show/i);
  });

  it("should change text content to show after clicking", () => {
    renderWithProvider(mockedState);
    const btnMenu = screen.getByTestId("btn-menu");

    fireEvent.click(btnMenu);
    expect(btnMenu).not.toHaveTextContent("Hide");
    expect(btnMenu).toHaveTextContent("Show");
  });

  it("should call toggleMenu => setHideForm fn after clicking show btn", () => {

    renderWithProvider(mockedState);
    const btnMenu = screen.getByTestId("btn-menu");
    const mainInputs =screen.getByTestId(/main-inputs/i);

    fireEvent.click(btnMenu);
    expect(mainInputs).toHaveClass("move-up-mrg");
    // expect(mainInputs).not.toBeVisible();
  });


});
