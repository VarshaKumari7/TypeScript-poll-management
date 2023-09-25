import { ProgressBar } from "devextreme-react/progress-bar";
import "./signup.scss";
const Poll = () => {
  const handleValueChange = (e: any) => {};
  return (
    <div className="container">
      <div className="content-box">
        <div className="row">
          <div className="row-content">
            <div className="text">React</div>
          </div>
          <ProgressBar min={0} max={100} value={69} />
        </div>
        <div className="row">
          <div className="row-content">
            <div className="text">Typescript</div>
          </div>

          <ProgressBar
            min={0}
            max={100}
            value={90}
            onValueChanged={handleValueChange}
          />
        </div>
        <div className="row">
          <div className="row-content">
            <div className="text">Angular</div>
          </div>
          <ProgressBar min={0} max={100} value={20} />
        </div>
        <div className="row">
          <div className="row-content">
            <div className="text">Vue Js</div>
          </div>
          <ProgressBar min={0} max={100} value={40} />
        </div>
      </div>
    </div>
  );
};

export default Poll;
