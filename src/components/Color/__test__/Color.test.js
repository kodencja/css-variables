import { render, screen, fireEvent } from "@testing-library/react";
import Color from "../Color";

describe("Base color", () => {
  let currentValue = "#f7d9d9";
  let mockedState = {
    color: "#f7d9d9",
  };

  const getMockedState = (val) => {
    mockedState = { color: val };
  };

  const setValue = (value) => {
    let newState;
    newState = { ...mockedState, color: value };
    mockedState = newState;
  };

  const mockedHandleChanging = (e) => setValue(e.target.value);
  const mockedOnChanging = jest.fn();

  test("should render input", async () => {
    render(<Color onChanging={mockedOnChanging} onValue={mockedState} />);

    const inputElement = screen.getByLabelText(/Base color/i);
    expect(inputElement).toBeInTheDocument();
  });

  it("should call onChanging method", () => {
    getMockedState("#f7d9cc");
    render(<Color onChanging={mockedOnChanging} onValue={mockedState} />);

    const inputElement = screen.getByLabelText(/Base color/i);
    fireEvent.click(inputElement);
    fireEvent.change(inputElement, { target: { value: "#dca9d9" } });
    expect(mockedOnChanging).toBeCalled();
  });

  it("should call onChanging method 1 time and the right value", () => {
    getMockedState("#f7d9d9");

    render(<Color onChanging={mockedOnChanging} onValue={{}} />);

    const inputElement = screen.getByLabelText(/Base color/i);
    fireEvent.click(inputElement);
    fireEvent.change(inputElement, { target: { value: "#aca9d9" } });
    expect(mockedOnChanging).toHaveBeenCalledTimes(1);

    expect(mockedOnChanging).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: "#aca9d9",
        }),
      })
    );
  });

  it("should be able to change input value", () => {
    render(<Color onChanging={mockedOnChanging} onValue={{}} />);

    const inputElement = screen.getByLabelText(/Base color/i);
    fireEvent.click(inputElement);
    fireEvent.change(inputElement, { target: { value: "#bca9d9" } });
    expect(inputElement.value).toBe("#bca9d9");
  });

  it("should be able to render output initial text", async () => {
    getMockedState("#f7d9aa");

    const { getByLabelText } = render(
      <Color onChanging={mockedHandleChanging} onValue={mockedState} />
    );

    const inputElement = getByLabelText(/base-color/i);
    const outputElem = screen.getByTestId("base-color");

    expect(inputElement.value).toBe("#f7d9aa");
    expect(outputElem.textContent).toBe("#f7d9aa");
  });

  it("should be able to change input value with currentValue", async () => {
    const { getByRole } = render(
      <Color onChanging={mockedOnChanging} onValue={currentValue} />
    );

    const inputElement = screen.getByLabelText(/base-color/i);
    console.log("inputElement.value1: ", inputElement.value);
    fireEvent.change(inputElement, { target: { value: "#f7d9bc" } });
    expect(inputElement.value).toBe("#f7d9bc");
  });

  it("output should be able to change its text content", async () => {
    getMockedState("#f7d921");

    const { getByTestId } = render(
      <Color onChanging={mockedHandleChanging} onValue={mockedState} />
    );

    const outputElem = getByTestId("base-color");

    console.log(outputElem.textContent);
    console.log("mockedState2: ", mockedState);

    expect(outputElem).toHaveTextContent("#f7d921");
  });
});
