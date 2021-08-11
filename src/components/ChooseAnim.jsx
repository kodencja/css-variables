import React from "react";

function ChooseAnim({ onChanging }) {
  //   console.log("ChooseAnim Comp.");
  return (
    <div className="animation-type form-group">
      <div className="input-block ml-2">
        <label htmlFor="animation">Animation</label>
        <select
          className="form-control"
          id="animation"
          name="animation"
          onChange={onChanging}
          defaultValue="animRotateXYZ"
        >
          <option value="none">none</option>
          <option value="animRotate">rotate</option>
          <option value="animRotateX">rotate-X</option>
          <option value="animRotateY">rotate-Y</option>
          <option value="animRotateZ">rotate-Z</option>
          <option value="animRotateXY">rotate-X-Y</option>
          <option value="animRotateXY">rotate-Y-X</option>
          <option value="animRotateXZ">rotate-X-Z</option>
          <option value="animRotateZX">rotate-Z-X</option>
          <option value="animRotateYZ">rotate-Y-Z</option>
          <option value="animRotateZY">rotate-Z-Y</option>
          <option value="animRotateXYZ">rotate-X-Y-Z</option>
          <option value="animRotateXZY">rotate-X-Z-Y</option>
          <option value="animRotateYXZ">rotate-Y-X-Z</option>
          <option value="animRotateYZX">rotate-Y-Z-X</option>
          <option value="animRotateZXY">rotate-Z-X-Y</option>
          <option value="animRotateZYX">rotate-Z-Y-X</option>
        </select>
      </div>
    </div>
  );
}

export default React.memo(ChooseAnim);
