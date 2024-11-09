import "../styles/color.css"

function Color({color,selectColor}) {
    return (
        <div className={`circle`} style={{ backgroundColor: `${color}` }} onClick={(e)=>selectColor(e)}></div>
    );
}

export default Color;
