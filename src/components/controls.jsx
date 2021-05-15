import React, { useContext, lazy, Suspense } from "react";
import { ModalContext } from "../App";
const Blur = lazy(() => import("./Blur"));
const Color = lazy(() => import("./Color"));
const Spacing = lazy(() => import("./Spacing"));

function Controls() {
  console.log("Controls Fn");
  const modalContextValue = useContext(ModalContext);
  const { onChanging, onValue } = modalContextValue;

  return (
    <div className="container-fluid sec1 m-0">
      <form className="form-group row py-4 mx-auto">
        <Suspense fallback={<p>Loading...</p>}>
          <Spacing onChanging={onChanging} onValue={onValue} />
          <Blur onChanging={onChanging} onValue={onValue} />
          <Color onChanging={onChanging} onValue={onValue} />
          {/* {children} */}
        </Suspense>
      </form>
    </div>
  );
}

export default React.memo(Controls);
