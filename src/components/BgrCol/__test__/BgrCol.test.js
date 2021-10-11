import { render, screen, fireEvent, cleanup, waitFor, } from "@testing-library/react";
import BgrCol from "../BgrCol";

afterEach(cleanup);


describe("Background Color", () => {

  let currentValue = "#527197";
  let mockedState = {
    bgrCol: "#527197",
};
  // let mockedState;

const getMockedState = (val) => {
  mockedState = {bgrCol: val}
}

const setValue = (value) => {
  let newState;
  newState = { ...mockedState, blur: value};
  mockedState = newState;
};

const mockedHandleChanging = (e) => setValue(e.target.value);
const mockedOnChanging = jest.fn();

  test("should render input", async () => {
    render(
      <BgrCol onChanging={mockedOnChanging} onValue={mockedState} />
    );

    // below in brackets we omit capital letters
    const inputElement = screen.getByLabelText(/Bgr Color/i);
    expect(inputElement).toBeInTheDocument();
  });

  it("should call onChanging method", () => {

    getMockedState("#f7d9d9");
    render(
      <BgrCol onChanging={mockedOnChanging} onValue={mockedState} />
    );

    const inputElement = screen.getByLabelText(/Bgr Color/i);
    fireEvent.click(inputElement);
    fireEvent.change(inputElement, { target: { value: "#dca9d9" } });
    expect(mockedOnChanging).toBeCalled();
  });

  it("should call onChanging method 1 time and the right value", () => {
    getMockedState("#f7d9d9");

    render(
      <BgrCol onChanging={mockedOnChanging} onValue={{ }} />
    );

    const inputElement = screen.getByLabelText(/Bgr Color/i);
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
    render(
      <BgrCol onChanging={mockedOnChanging} onValue={{ }} />
    );

    const inputElement = screen.getByLabelText(/Bgr Color/i);
    fireEvent.click(inputElement);
    fireEvent.change(inputElement, { target: { value: "#bca9d9" } });
    expect(inputElement.value).toBe("#bca9d9");

  });

  it("should be able to render output initial text", async () => {

    getMockedState("#f7d9aa");

    const { getByLabelText } = render(
      <BgrCol
        onChanging={mockedHandleChanging}
        onValue={mockedState}
      />
  );


  const inputElement = getByLabelText(/bgr-col/i);
    const outputElem = screen.getByTestId("bgr-output");

    expect(inputElement.value).toBe("#f7d9aa");
    expect(outputElem.textContent).toBe("#f7d9aa");
    
  });

  it('should be able to change input value with currentValue', async ()=>{
      

    const { getByRole } = render(
      <BgrCol
        onChanging={mockedOnChanging}
        onValue={currentValue}
      />
  );

  const inputElement = screen.getByLabelText(/bgr-col/i);
    console.log("inputElement.value1: ", inputElement.value);
    fireEvent.change(inputElement, { target: { value: "#f7d9bc" } });
    expect(inputElement.value).toBe("#f7d9bc");
  });

  it('output should be able to change its text content', async ()=>{

  getMockedState("#f7d921");

    const { getByTestId } = render(
      <BgrCol
        onChanging={mockedHandleChanging}
        onValue={mockedState}
      />
  );

  const outputElem = getByTestId("bgr-output");
  
  console.log(outputElem.textContent);
  console.log("mockedState2: ", mockedState);

  expect(outputElem).toHaveTextContent("#f7d921");
  // await waitFor(() => expect(screen.getByText("#f7d921")).toBeInTheDocument());
  });

});
