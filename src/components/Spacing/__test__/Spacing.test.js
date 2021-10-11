import {
  render,
  screen,
  cleanup,
  waitFor,
  fireEvent,
} from "@testing-library/react";
import Spacing from "../Spacing";

afterEach(cleanup);

describe("Spacing and output values", () => {
  let currentValue = 10;
  let mockedState = {
    spacing: 10,
  };

  const getMockedState = (val) => {
    mockedState = { spacing: val };
  };

  const setValue = (value) => {
    let newState;
    newState = { ...mockedState, spacing: value };
    mockedState = newState;
  };

  const mockedHandleChanging = (e) => setValue(e.target.value);
  const mockedOnChanging = jest.fn();
  const mockOnOutputStyle = jest.fn();

  const mockOnGetOutputStyle = (e) => {
    if (e !== undefined && e !== null) {
      let minVal = 0;
      let maxVal = 150;

      return {
        left:
          ((parseInt(mockedState.spacing) + minVal) * 100) / (minVal + maxVal) +
          "%",
      };
    }
  };

  test("should render the same text into text prop", () => {
    render(
      <Spacing
        onChanging={mockedOnChanging}
        onValue={mockedState}
        onGetOutputStyle={mockOnGetOutputStyle}
        onOutputStyle={mockOnOutputStyle}
      />
    );

    const inputElement = screen.getByLabelText(/spacing/i);
    expect(inputElement).toBeInTheDocument();
  });

  it("should call onChanging method", () => {
    render(
      <Spacing
        onChanging={mockedOnChanging}
        onValue={mockedState}
        onGetOutputStyle={mockOnGetOutputStyle}
        onOutputStyle={mockOnOutputStyle}
      />
    );

    const inputElement = screen.getByLabelText(/spacing/i);
    fireEvent.click(inputElement);
    fireEvent.change(inputElement, { target: { value: 14 } });
    expect(mockedOnChanging).toBeCalled();
  });

  it("should call onChanging method 1 time and the right value", () => {
    render(
      <Spacing
        onChanging={mockedOnChanging}
        onValue={currentValue}
        onGetOutputStyle={mockOnGetOutputStyle}
        onOutputStyle={mockOnOutputStyle}
      />
    );

    const inputElement = screen.getByLabelText(/spacing/i);
    fireEvent.click(inputElement);
    fireEvent.change(inputElement, { target: { value: 12 } });
    expect(mockedOnChanging).toHaveBeenCalledTimes(1);

    expect(mockedOnChanging).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: "12",
        }),
      })
    );
  });

  it("should be able to render output initial text", async () => {
    getMockedState(10);

    const { rerender } = render(
      <Spacing
        onChanging={mockedHandleChanging}
        onValue={mockedState}
        onGetOutputStyle={mockOnGetOutputStyle}
        onOutputStyle={mockOnOutputStyle}
      />
    );

    const inputElement = screen.getByRole("slider", { name: /spacing/i });
    const outputElem = screen.getByTestId("spacing-output");

    expect(inputElement.value).toBe("10");
    expect(outputElem.textContent).toBe("10px");
  });

  it("should be able to change input value", async () => {
    const { getByRole } = render(
      <Spacing
        onChanging={mockedOnChanging}
        onValue={currentValue}
        onGetOutputStyle={mockOnGetOutputStyle}
        onOutputStyle={mockOnOutputStyle}
      />
    );

    const inputElement = getByRole("slider", { name: /spacing/i });
    console.log("inputElement.value1: ", inputElement.value);
    fireEvent.change(inputElement, { target: { value: 75 } });
    expect(inputElement.value).toBe("75");
  });

  it("output should be able to change its text content", async () => {
    getMockedState(87);

    const { getByTestId } = render(
      <Spacing
        onChanging={mockedHandleChanging}
        onValue={mockedState}
        onGetOutputStyle={mockOnGetOutputStyle}
        onOutputStyle={mockOnOutputStyle}
      />
    );

    const outputElem = getByTestId("spacing-output");

    console.log(outputElem.textContent);
    console.log("mockedState2: ", mockedState);

    expect(outputElem).toHaveTextContent("87px");
    await waitFor(() => expect(screen.getByText("87px")).toBeInTheDocument());
  });

  it("should be able to change output left style while spacing value changes", async () => {
    getMockedState(75);

    const { getByTestId, getByRole, rerender } = render(
      <Spacing
        onChanging={mockedHandleChanging}
        onValue={mockedState}
        onGetOutputStyle={mockOnGetOutputStyle}
        onOutputStyle={mockOnOutputStyle}
      />
    );

    const outputElem = getByTestId("spacing-output");

    console.log(outputElem.textContent);

    expect(outputElem).toHaveStyle({ left: "50%" });
    expect(outputElem).not.toHaveStyle({ left: "60%" });

    const inputElement = getByRole("slider", { name: /spacing/i });
    fireEvent.change(inputElement, { target: { value: 120 } });

    await waitFor(() =>
      rerender(
        <Spacing
          onChanging={mockedHandleChanging}
          onValue={mockedState}
          onGetOutputStyle={mockOnGetOutputStyle}
          onOutputStyle={mockOnOutputStyle}
        />
      )
    );

    console.log(outputElem.textContent);
    expect(outputElem).toHaveStyle(`left: 80%`);
    expect(outputElem).not.toHaveStyle(`left: 85%`);
  });

  it("input should remain min value", () => {
    getMockedState(-20);

    const { rerender } = render(
      <Spacing
        onChanging={mockedHandleChanging}
        onValue={mockedState}
        onGetOutputStyle={mockOnGetOutputStyle}
        onOutputStyle={mockOnOutputStyle}
      />
    );

    const inputElement = screen.getByRole("slider", { name: /spacing/i });
    expect(inputElement.value).toBe("0");
  });

  it("input should remain max value", () => {
    getMockedState(200);

    render(
      <Spacing
        onChanging={mockedHandleChanging}
        onValue={mockedState}
        onGetOutputStyle={mockOnGetOutputStyle}
        onOutputStyle={mockOnOutputStyle}
      />
    );

    const inputElement = screen.getByRole("slider", { name: /spacing/i });
    expect(inputElement.value).toBe("150");
  });
});
