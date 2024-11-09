import Color from "./Color";
import "../styles/colorPalette.css"
function ColorPalette({ colorPalette, selectColor }) {

    return (
        <div className="colorPalette">
            {colorPalette.map((color, i) => {
                return <Color selectColor={selectColor} color={color} key={`colorPalette:${i}`} />
            })}
        </div>
    );
}

export default ColorPalette;
