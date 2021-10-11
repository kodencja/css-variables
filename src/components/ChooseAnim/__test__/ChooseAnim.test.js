import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ChooseAnim from "../ChooseAnim";

afterEach(cleanup);

const mockedOnChanging = jest.fn();
const optionsValues = [
  "none",
  "animRotate",
  "animRotateX",
  "animRotateY",
  "animRotateZ",
  "animRotateXY",
  "animRotateXY",
  "animRotateXZ",
  "animRotateZX",
  "animRotateYZ",
  "animRotateZY",
  "animRotateXYZ",
  "animRotateXZY",
  "animRotateYXZ",
  "animRotateYZX",
  "animRotateZXY",
  "animRotateZYX",
];

const options = [
  "none",
  "rotate",
  "rotate-X",
  "rotate-Y",
  "rotate-Z",
  "rotate-X-Y",
  "rotate-Y-X",
  "rotate-X-Z",
  "rotate-Z-X",
  "rotate-Y-Z",
  "rotate-Z-Y",
  "rotate-X-Y-Z",
  "rotate-X-Z-Y",
  "rotate-Y-X-Z",
  "rotate-Y-Z-X",
  "rotate-Z-X-Y",
  "rotate-Z-Y-X",
];

describe("Choose animation form", () => {
  test("should render the right form", async () => {
    render(
      <ChooseAnim
        onChanging={mockedOnChanging}
        optionsValues={optionsValues}
        options={options}
      />
    );

    const formElement = screen.getByTestId(/animation-select/i);
    expect(formElement).toBeInTheDocument();
  });

  it("should call onChange fn with right value", async () => {
    render(
      <ChooseAnim
        onChanging={mockedOnChanging}
        optionsValues={optionsValues}
        options={options}
      />
    );

    const selectElement = screen.getByTestId(/animation-select/i);

    fireEvent.click(selectElement);
    fireEvent.change(selectElement, { target: { value: "animRotateYZ" } });

    expect(mockedOnChanging).toBeCalled();
    expect(mockedOnChanging).toHaveBeenCalledTimes(1);

    // Another change is to only selected value instead of entire option
    expect(mockedOnChanging).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: "animRotateYZ",
        }),
      })
    );
  });

  it("should render the choosen option in select", async () => {
    render(
      <ChooseAnim
        onChanging={mockedOnChanging}
        optionsValues={optionsValues}
        options={options}
      />
    );

    const selectElement = screen.getByLabelText(/animation/i);

    userEvent.selectOptions(selectElement, "animRotateYZ");

    const choosenOption = screen.getByText("rotate-Y-Z");
    const anotherOption = screen.getByText("rotate-Z");

    expect(choosenOption.selected).toBeTruthy();
    expect(anotherOption.selected).toBeFalsy();
  });
});
