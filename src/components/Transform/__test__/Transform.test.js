import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
} from "@testing-library/react";
import Transform from "../Transform";


afterEach(cleanup);

describe("Check transform origin change with simple var", () => {

  let currentValue = 50;
  let mockedState;
  
  const mockedOnChanging = jest.fn();
  const mockOnOutputStyle = jest.fn();
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

  beforeEach(async () => {
    render(
      <Transform
        onChanging={mockedOnChanging}
        onValue={currentValue}
        onGetOutputStyle={mockOnGetOutputStyle}
        onOutputStyle={mockOnOutputStyle}
      />
    );

    inputElement = await screen.findAllByLabelText(/trans-orig/i);
  });

  it("should call onChanging method 1 time and with the right value", () => {
    inputElement.forEach( elem => {
      fireEvent.click(elem);
      fireEvent.change(elem, { target: { value: 80 } });
    });

    expect(mockedOnChanging).toHaveBeenCalledTimes(inputElement.length);
    expect(mockedOnChanging).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: "80",
        }),
      })
    );
  });

  it("should be able to change input value", async () => {
    inputElement.forEach(elem => {
      fireEvent.change(elem, { target: { value: 75 } });
      expect(elem.value).toBe("75");
    })
  });
});


describe("All inputs and outputs should have initial values", () => {

  afterEach(() => cleanup());
  let mockedState = {
    transOrigX: 50,
    transOrigY: 50,
    transOrigZ: 0,
    rotatex: 18,
    rotatez: 18,
    rotatey: 18,
    skew: 18,   
  };
  
  const mockedOnChanging = jest.fn();
  const mockedGetOutputStyle = jest.fn();
  const mockOnOutputStyle = jest.fn();

  let allInputs, allOutputElem;

  beforeEach(async () => {
    await waitFor(() => { render(
      <Transform
        onChanging={mockedOnChanging}
        onValue={mockedState}
        onGetOutputStyle={mockedGetOutputStyle}
        onOutputStyle={mockOnOutputStyle}
      />
    );
  });

  allInputs = await screen.findAllByRole('slider');
  allOutputElem = await screen.findAllByTestId("transform-output");
  });

  it("should render input to be in document", async () => {
    allInputs.forEach( (elem)=>{
      expect(elem).toBeInTheDocument();
    });
  });

  it("should call onChanging method", async () => {
    allInputs.forEach((elem)=>{
      fireEvent.click(elem);
      fireEvent.change(elem, { target: { value: 55 } });
      expect(mockedOnChanging).toBeCalled();
      expect(mockedGetOutputStyle).toBeCalled();
    })
  });

  it("should be able to render initial values for all inputs and outputs text", async () => {
    allInputs.forEach((elem, ind)=>{ 
      let initVal;
      if(ind < 2) initVal = "50";
      else if(ind === 2) initVal = "0";
      else initVal = "18";
      expect(elem.value).toBe(initVal);
      expect(elem.value).not.toBe("23");  
    });

    allOutputElem.forEach((elem, ind)=>{ 
      let initVal;
      if(ind < 2) initVal = "50%";
      else if(ind === 2) initVal = "0px";
      else initVal = "18deg";
      expect(elem.textContent).toBe(initVal);    
      expect(elem.textContent).not.toBe("43deg");    
    });
  });
});

let mockedState = {
  transOrigX: 50,
  transOrigY: 50,
  transOrigZ: 0,
  rotatex: 18,
  rotatez: 18,
  rotatey: 18,
  skew: 18,   
};

const getMockedState = (prop, val) => {
  mockedState = {...mockedState, [prop]: val };
};

const setValue = (name, value) => {
  let newState;
  newState = { ...mockedState, [name]: value };
  mockedState = newState;
};

const mockedHandleChanging = (e) => setValue(e.target.name, e.target.value);
const mockOnOutputStyle = jest.fn();

const mockOnGetOutputStyle = (e, min, max) => {
  
  if (e !== undefined && e !== null) {
    console.log(e.target);
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

const allInputsNames = ["transOrigX","transOrigY", "transOrigZ", 'rotatex', 'rotatey','rotatez','skew'];

  let inputElementsTransOrig, inputElementsRotate, inputElementSkew, renderAgain, allInputs, allOutputElem, trans_origin_outputs, rotate_outputs, skew_output;

// render mocked component
  const renderComp = async (val, min, max) => {

  await waitFor(() => { 
    if(val !== undefined){
      allInputsNames.forEach((name) => {
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

  allInputs = await screen.findAllByRole('slider');
  inputElementsTransOrig = allInputs.filter((input, ind )=> ind < 3);
  inputElementsRotate = allInputs.filter((input, ind )=> ind >= 3 && ind < 6);
  inputElementSkew = allInputs[allInputs.length-1];

  allOutputElem = await screen.findAllByTestId("transform-output");
  trans_origin_outputs = await screen.findAllByLabelText(/output-transform/i);
  rotate_outputs = await screen.findAllByLabelText(/output-rotate/i);
  skew_output = screen.getByLabelText(/output-skew/i);

};


describe("check input and output with changing values", () => {

  it("output should be able to change its text content", async () => {

    await waitFor(() => { renderComp(87, -100, 100) });

    allOutputElem.forEach( async (elem, ind)=>{
      expect(elem).toBeInTheDocument();
      let unit;
      if(ind < 2 ){
        unit = "%";
      } else if(ind === 2) {
        unit="px";
      } else if(ind > 2) {
        unit= "deg"
      }
      expect(elem).toHaveTextContent("87" + unit);
    })
    const percentArray = await screen.findAllByText("87%");
    expect(percentArray[0]).toBeInTheDocument();
    expect(screen.getByText("87px")).toBeInTheDocument();
    expect((await screen.findAllByText("87deg"))[0]).toBeInTheDocument();
  });

  it("should be able to change output left style while inputs values change in trans-origin outputs", async () => {
    
    await waitFor(() => renderComp(36, -100, 100));
// output elements should be divided due to min and max values so for trans-origin and rotate and skew
trans_origin_outputs.forEach( async (elem, ind)=>{
      expect(elem).toHaveStyle(`left: 68%`);
      expect(elem).not.toHaveStyle(`left: 56%`);
      });

      allInputs.forEach( (elem)=>{
      fireEvent.change(elem, { target: { value: 72 } });
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

    trans_origin_outputs.forEach( async (elem, ind)=>{
      expect(elem).toHaveStyle(`left: 86%`);
      expect(elem).not.toHaveStyle(`left: 77%`);
      });
  });


  it("should be able to change output left style while inputs values change in rotate outputs", async () => {
    
    await waitFor(() => renderComp(36, -180, 180));
// output elements should be divided due to min and max values so for trans-origin and rotate and skew
rotate_outputs.forEach( async (elem, ind)=>{
      expect(elem).toHaveStyle(`left: 60%`);
      expect(elem).not.toHaveStyle(`left: 56%`);
      });

      allInputs.forEach( (elem)=>{
      fireEvent.change(elem, { target: { value: 72 } });
    });

    await waitFor((min = -180, max = 180) =>
      renderAgain(
        <Transform
          onChanging={mockedHandleChanging}
          onValue={mockedState}
          onGetOutputStyle={(e) => mockOnGetOutputStyle(e, min, max)}
          onOutputStyle={mockOnOutputStyle}
        />
      )
    );

    rotate_outputs.forEach( async (elem, ind)=>{
      expect(elem).toHaveStyle(`left: 70%`);
      expect(elem).not.toHaveStyle(`left: 77%`);
      });
  });

  it("should be able to change output left style while inputs values change in skew output", async () => {
    
    await waitFor(() => renderComp(36, -90, 90));

// output elements should be divided due to min and max values so for trans-origin and rotate and skew
      expect(skew_output).toHaveStyle(`left: 70%`);
      expect(skew_output).not.toHaveStyle(`left: 56%`);

      allInputs.forEach( (elem)=>{
        fireEvent.change(elem, { target: { value: 72 } });
      });

    await waitFor((min = -90, max = 90) =>
      renderAgain(
        <Transform
          onChanging={mockedHandleChanging}
          onValue={mockedState}
          onGetOutputStyle={(e) => mockOnGetOutputStyle(e, min, max)}
          onOutputStyle={mockOnOutputStyle}
        />
      )
    );

      expect(skew_output).toHaveStyle(`left: 90%`);
      expect(skew_output).not.toHaveStyle(`left: 77%`);

  });


  it("input should remain min value for trans-origin inputs", async () => {

    await waitFor(() => renderComp(-150, -100, 100));

    inputElementsTransOrig.forEach( async (elem)=>{
      expect(elem.value).toBe("-100");
      expect(elem.value).not.toBe("-150");
    });
  });

  it("input should remain max value for trans-origin inputs", async () => {

    await waitFor(() => renderComp(200, -100, 100));
 
    inputElementsTransOrig.forEach( async (elem)=>{
      expect(elem.value).toBe("100");
      expect(elem.value).not.toBe("200");
    });
  });


  it("input should remain min value for rotate inputs", async () => {

    await waitFor(() => renderComp(-200, -180, 180));

    inputElementsRotate.forEach( async (elem)=>{
      expect(elem.value).toBe("-180");
      expect(elem.value).not.toBe("-200");
    });
  });

  it("input should remain max value for rotate inputs", async () => {

    await waitFor(() => renderComp(200, -180, 180));

    inputElementsRotate.forEach( async (elem)=>{
      expect(elem.value).toBe("180");
      expect(elem.value).not.toBe("200");
    });
  });

  it("input should remain min value for skew input", async () => {

    await waitFor(() => renderComp(-100, -90, 90));

      expect(inputElementSkew.value).toBe("-90");
      expect(inputElementSkew.value).not.toBe("-100");
  });

  it("input should remain max value for skew input", async () => {

    await waitFor(() => renderComp(100, -90, 90));
 
      expect(inputElementSkew.value).toBe("90");
      expect(inputElementSkew.value).not.toBe("100");
  });

});
