import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
} from "@testing-library/react";
import Transform from "../Transform";




afterEach(cleanup);
// const getInput = (val) =>  (screen.getByLabelText(val));
// const getInput = (val) =>  (screen.getByRole("slider", { name: `${val}` } ));
// const getInput = (val) =>  (screen.getByRole("slider", { name: val } ));

// const getOutput = (testid_val) => {return screen.getByTestId(`${testid_val}`)};
// const getOutput = (testid_val) => {return screen.getByTestId(`${testid_val}`)};

// let outputElem;

describe("Check transform origin change with simple var", () => {

  let currentValue = 50;
  // let mockedState = {
  //   transOrigX: 10,
  // };
  let mockedState;
  
  const getMockedState = (prop, val) => {
    mockedState = { [prop]: val };
  };
  
  const setValue = (name, value) => {
    let newState;
    newState = { ...mockedState, [name]: value };
    mockedState = newState;
  };
  
  const mockedHandleChanging = (e) => setValue(e.target.name, e.target.value);
  const mockedOnChanging = jest.fn();
  const mockOnOutputStyle = jest.fn();
  // const mockOnGetOutputStyle = jest.fn();
  const mockOnGetOutputStyle = (e) => {
    if (e !== undefined && e !== null) {
      let minVal = -100;
      let maxVal = 100;
      if (minVal < 0) minVal = minVal * -1;
  
      return {
        left:
          ((parseInt(mockedState.transOrigX) + minVal) * 100) /
            (minVal + maxVal) +
          "%",
      };
    }
  };

  let inputElement;

  beforeEach(() => {
    render(
      <Transform
        onChanging={mockedOnChanging}
        onValue={currentValue}
        onGetOutputStyle={mockOnGetOutputStyle}
        onOutputStyle={mockOnOutputStyle}
      />
    );

    inputElement = screen.getByLabelText(/trans-orig-x/i);
  });

  it("should call onChanging method 1 time and the right value", () => {
    fireEvent.click(inputElement);
    fireEvent.change(inputElement, { target: { value: 80 } });
    expect(mockedOnChanging).toHaveBeenCalledTimes(1);

    expect(mockedOnChanging).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: "80",
        }),
      })
    );
  });

  it("should be able to change input value", async () => {
    fireEvent.change(inputElement, { target: { value: 75 } });
    expect(inputElement.value).toBe("75");
  });
});

let mockedState = {
  transOrigX: 50,
  transOrigY: 50,
  transOrigZ: 0,
};

const getMockedState = (prop, val) => {
  mockedState = {...mockedState, [prop]: val };
};

const setValue = (name, value) => {
  let newState;
  newState = { ...mockedState, [name]: value };
  mockedState = newState;
};

const mockedOnChanging = jest.fn();
const mockedGetOutputStyle = jest.fn();
const mockedHandleChanging = (e) => setValue(e.target.name, e.target.value);
const mockOnOutputStyle = jest.fn();

const mockOnGetOutputStyle = (e, min, max) => {
  if (e !== undefined && e !== null) {
    let minVal = min;
    let maxVal = max;
    if (minVal < 0) minVal = minVal * -1;

    return {
      left:
        ((parseInt(mockedState.transOrigX) + minVal) * 100) /
          (minVal + maxVal) +
        "%",
    };
  }
};

const inputTransOrigNames = ["transOrigX","transOrigY", "transOrigZ"];
const inputAriaLabels = ["trans-orig-x","trans-orig-y"];
const outputData = ["trans-orig-x-output","trans-orig-y-output"];

  let inputElement, outputElem, renderAgain;


  const renderComp = async (val, min, max) => {

  await waitFor(() => { 
    if(val !== undefined){
      inputTransOrigNames.forEach((name) => {
        getMockedState(name, val); 
      })
    }

  });
  const { rerender } = render(
    <Transform
      onChanging={mockedHandleChanging}
      onValue={mockedState}
      onGetOutputStyle={(e) => mockOnGetOutputStyle(e, min, max)}
      onOutputStyle={mockOnOutputStyle}
    />
  );
  renderAgain = rerender;
  inputElement = await screen.findAllByTestId(/transform-origin/i);
  outputElem = await screen.findAllByTestId("trans-orig-output");

};

describe("Transform origin X and output values with initial value", () => {


  afterEach(() => cleanup());
  let inputElement, outputElem;

  beforeEach(async () => {
    // getMockedState("transOrigX", 50);
    // await waitFor(() => { renderComp(undefined, -100, 100) });
    await waitFor(() => { render(
      <Transform
        onChanging={mockedOnChanging}
        onValue={mockedState}
        onGetOutputStyle={mockedGetOutputStyle}
        onOutputStyle={mockOnOutputStyle}
      />
    );
  });
  inputElement = await screen.findAllByTestId(/transform-origin/i);
  outputElem = await screen.findAllByTestId("trans-orig-output");
    // inputElement = screen.getByLabelText(/trans-orig-x/i);
    // outputElem = screen.getByTestId("trans-orig-x-output");
  });

  it("should render the same text into text prop", async () => {
    inputElement.forEach( (elem)=>{
      // fireEvent.change(elem, { target: { value: 50 } });
      expect(elem).toBeInTheDocument();
    });
    // expect(inputElement).toBeInTheDocument();
  });

  it("should call onChanging method", async () => {
    inputElement.forEach((elem)=>{
      fireEvent.click(elem);
      fireEvent.change(elem, { target: { value: 55 } });
      expect(mockedOnChanging).toBeCalled();
      expect(mockedGetOutputStyle).toBeCalled();
    })

    // fireEvent.click(inputElement);
    // fireEvent.change(inputElement, { target: { value: 55 } });
    // expect(mockedOnChanging).toBeCalled();
  });

  it("should be able to render output initial text", async () => {
    inputElement.forEach((elem, ind)=>{ 
      let initVal;
      if(ind < 2) initVal = "50";
      else initVal = "0";
      expect(elem.value).toBe(initVal);
      expect(elem.value).not.toBe("23");
      // expect(outputElem.textContent).toBe("50%");    
    });

    outputElem.forEach((elem, ind)=>{ 
      let initVal;
      if(ind < 2) initVal = "50%";
      else initVal = "0px";
      expect(elem.textContent).toBe(initVal);    
      expect(elem.textContent).not.toBe("43%");    
    });
    // expect(inputElement.value).toBe("50");
    // expect(outputElem.textContent).toBe("50%");
  });
});


// const renderComp = (val) => {
//   getMockedState("transOrigX", val);
//   const { rerender } = render(
//     <Transform
//       onChanging={mockedHandleChanging}
//       onValue={mockedState}
//       onGetOutputStyle={mockOnGetOutputStyle}
//       onOutputStyle={mockOnOutputStyle}
//     />
//   );
//   renderAgain = rerender;
//   inputElement = screen.getByLabelText(/trans-orig-x/i);
//   outputElem = screen.getByTestId("trans-orig-x-output");
// };

describe("check input and output with different values", () => {

  // let mockedState = {
  //   transOrigX: 50,
  //   transOrigY: 50,
  //   transOrigZ: 0,
  // };
  
  // const getMockedState = (prop, val) => {
  //   mockedState = {...mockedState, [prop]: val };
  // };
  
  // const setValue = (name, value) => {
  //   let newState;
  //   newState = { ...mockedState, [name]: value };
  //   mockedState = newState;
  // };
  
  // const mockedHandleChanging = (e) => setValue(e.target.name, e.target.value);
  // const mockOnOutputStyle = jest.fn();

  // const mockOnGetOutputStyle = (e, min, max) => {
  //   if (e !== undefined && e !== null) {
  //     let minVal = min;
  //     let maxVal = max;
  //     if (minVal < 0) minVal = minVal * -1;
  
  //     return {
  //       left:
  //         ((parseInt(mockedState.transOrigX) + minVal) * 100) /
  //           (minVal + maxVal) +
  //         "%",
  //     };
  //   }
  // };

  // afterEach(cleanup);


  it("output should be able to change its text content", async () => {

    await waitFor(() => { renderComp(87, -100, 100) });

    outputElem.forEach( async (elem, ind)=>{
      expect(elem).toBeInTheDocument();
      let unit;
      if(ind < 2 ){
        unit = "%";
      } else {
        unit="px";
      }
      expect(elem).toHaveTextContent("87"+unit);
    })
    const percentArray = await screen.findAllByText("87%");
    expect(percentArray[0]).toBeInTheDocument();
    expect(screen.getByText("87px")).toBeInTheDocument();
  });

  it("should be able to change output left style while spacing value changes", async () => {
    
    await waitFor(() => renderComp(10, -100, 100));

      outputElem.forEach( async (elem)=>{
        expect(elem).toHaveStyle(`left: 55%`);
        expect(elem).not.toHaveStyle(`left: 40%`);
      });

    inputElement.forEach( (elem)=>{
      fireEvent.change(elem, { target: { value: 50 } });
    });

    await waitFor((min = -100, max = 100) =>
      renderAgain(
        <Transform
          onChanging={mockedHandleChanging}
          onValue={mockedState}
          onGetOutputStyle={(e) => mockOnGetOutputStyle(e, min, max)}
          onOutputStyle={mockOnOutputStyle}
        />
      )
    );

    outputElem.forEach((elem)=>{
      expect(elem).toHaveStyle("left: 75%");
      expect(elem).not.toHaveStyle("left: 77%");
    });

  });

  it("input should remain min value", async () => {

    await waitFor(() => renderComp(-150, -100, 100));

    inputElement.forEach( async (elem)=>{
      expect(elem.value).toBe("-100");
      expect(elem.value).not.toBe("-80");
    });
  });

  it("input should remain max value", async () => {

    await waitFor(() => renderComp(200, -100, 100));
    inputElement.forEach( async (elem)=>{
      expect(elem.value).toBe("100");
      expect(elem.value).not.toBe("50");
    });
  });
});
