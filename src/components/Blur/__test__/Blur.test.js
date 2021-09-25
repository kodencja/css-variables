import { render, screen, fireEvent, cleanup, waitFor, getByText } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blur from "../Blur";

afterEach(cleanup);

describe("Blur and output values", () => {

  let currentValue = "0";
  let mockedState = {
    blur: "0",
};
  // let mockedState;

const getMockedState = (val) => {
  mockedState = {blur: val}
}

  const setValue = (value) => {
    let newState;
    newState = { ...mockedState, blur: value};
    mockedState = newState;
  };

  const mockedHandleChanging = (e) => setValue(e.target.value);
  const mockedOnChanging = jest.fn();
  const mockOnOutputStyle = jest.fn();
  // const mockOnGetOutputStyle = jest.fn();
  const mockOnGetOutputStyle = (e) => {
    if (e !== undefined && e !== null) {
      let minVal = 0;
      let maxVal = 30;

      return {
        left:
          ((parseInt(mockedState.blur) + minVal) * 100) / (minVal + maxVal) +
          '%',
      };
    }
  };


  test("should render the same text into text prop", () => {

    render(
      <Blur
        onChanging={mockedOnChanging}
        onValue={mockedState}
        onGetOutputStyle={mockOnGetOutputStyle}
        onOutputStyle={mockOnOutputStyle}
      />
    );

    const inputElement = screen.getByLabelText(/blur/i);
    expect(inputElement).toBeInTheDocument();
  });

  it("should call onChanging method", () => {

    render(
      <Blur
        onChanging={mockedOnChanging}
        onValue={mockedState}
        onGetOutputStyle={mockOnGetOutputStyle}
        onOutputStyle={mockOnOutputStyle}
      />
    );

    const inputElement = screen.getByLabelText(/blur/i);
    fireEvent.click(inputElement);
    fireEvent.change(inputElement, { target: { value: "10" } });
    expect(mockedOnChanging).toBeCalled();
  });

  it("should call onChanging method 1 time and the right value", () => {
    render(
      <Blur
        onChanging={mockedOnChanging}
        onValue={currentValue}
        onGetOutputStyle={mockOnGetOutputStyle}
        onOutputStyle={mockOnOutputStyle}
      />
    );

    const inputElement = screen.getByLabelText(/blur/i);
    fireEvent.click(inputElement);
    fireEvent.change(inputElement, { target: { value: "12" } });
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

    getMockedState("0");

    const { rerender } = render(
      <Blur
        onChanging={mockedHandleChanging}
        onValue={mockedState}
        onGetOutputStyle={mockOnGetOutputStyle}
        onOutputStyle={mockOnOutputStyle}
      />
  );


    const inputElement = screen.getByRole("slider", { name: /blur/i } );
    const outputElem = screen.getByTestId("blur-output");

    expect(inputElement.value).toBe("0");
    expect(outputElem.textContent).toBe("0px");
    
  });

  it('should be able to change input value', async ()=>{
      

    const { getByRole } = render(
      <Blur
        onChanging={mockedOnChanging}
        onValue={currentValue}
        onGetOutputStyle={mockOnGetOutputStyle}
        onOutputStyle={mockOnOutputStyle}
      />
  );

    const inputElement = getByRole("slider", { name: /blur/i } );
    console.log("inputElement.value1: ", inputElement.value);
    fireEvent.change(inputElement, { target: { valueAsNumber: "75" } });
    expect(inputElement.value).toBe("75");
  });

  it('output should be able to change its text content', async ()=>{

  getMockedState("87");

    const { getByTestId } = render(
      <Blur
        onChanging={mockedHandleChanging}
        onValue={mockedState}
        onGetOutputStyle={mockOnGetOutputStyle}
        onOutputStyle={mockOnOutputStyle}
      />
  );

  const outputElem = getByTestId("blur-output");
  
  console.log(outputElem.textContent);
  console.log("mockedState2: ", mockedState);

  expect(outputElem).toHaveTextContent("87px");
  await waitFor(() => expect(screen.getByText("87px")).toBeInTheDocument());
  });


  it('input should remain min value', ()=>{
    getMockedState("-10");

    const { rerender } = render(
      <Blur
        onChanging={mockedHandleChanging}
        onValue={mockedState}
        onGetOutputStyle={mockOnGetOutputStyle}
        onOutputStyle={mockOnOutputStyle}
      />
  );

    const inputElement = screen.getByRole("slider", { name: /blur/i } );
    expect(inputElement.value).toBe("0");
  });

  it('input should remain max value', ()=>{
    getMockedState("50");

    const { rerender } = render(
      <Blur
        onChanging={mockedHandleChanging}
        onValue={mockedState}
        onGetOutputStyle={mockOnGetOutputStyle}
        onOutputStyle={mockOnOutputStyle}
      />
  );

    const inputElement = screen.getByRole("slider", { name: /blur/i } );
    expect(inputElement.value).toBe("30");
  });

  it('should be able to change output left style while spacing value changes', async ()=>{
    
    getMockedState("15");

    const { getByTestId, getByRole, rerender } = render(
      <Blur
        onChanging={mockedHandleChanging}
        onValue={mockedState}
        onGetOutputStyle={mockOnGetOutputStyle}
        onOutputStyle={mockOnOutputStyle}
      />
  );

  const outputElem = getByTestId("blur-output");
  
  console.log(outputElem.textContent);

  expect(outputElem).toHaveStyle({left: '50%'});
  expect(outputElem).not.toHaveStyle({left: '60%'});

  const inputElement = getByRole("slider", { name: /blur/i } );
  fireEvent.change(inputElement, { target: { valueAsNumber: "27" } });

      await waitFor(() =>
    rerender(
      <Blur
        onChanging={mockedHandleChanging}
        onValue={mockedState}
        onGetOutputStyle={mockOnGetOutputStyle}
        onOutputStyle={mockOnOutputStyle}
      />
    )
    );

  console.log(outputElem.textContent);
  expect(outputElem).toHaveStyle('left: 90%');
  expect(outputElem).not.toHaveStyle(`left: 85%`);
  });


});
