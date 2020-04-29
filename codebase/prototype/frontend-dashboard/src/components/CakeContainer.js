import React, {useState} from "react";
import {useSelector, useDispatch} from 'react-redux'
import {buyCake} from "../redux";

function CakeContainer() {
    const numOfCakes = useSelector(state => state.cake.numOfCakes)
    const dispatch = useDispatch();
    const [number, setNumber] = useState(1)
    return(
        <div>
            <h2>Num of cakes - {numOfCakes}</h2>
            <input type="text" value={number} onChange={e=>setNumber(e.target.value)}/>
            <button onClick={()=>dispatch(buyCake(number))}>Buy {number} Cake</button>
        </div>
    )

}
export default CakeContainer;

//
// function CakeContainer( props ) {
//     return(
//         <div>
//             <h2>Num of cakes - {props.numOfCakes}</h2>
//             <button onClick={props.buyCake}>Buy Cake</button>
//         </div>
//     )
//
// }
//
// const mapStateToProps = state =>{
//     return {
//         numOfCakes: state.numOfCakes
//     }
// }
//
// const mapDispatchToProps = dispatch => {
//     return {
//         buyCake: () => dispatch(buyCake())
//     }
// }
//
//
// export default connect(mapStateToProps,mapDispatchToProps)(CakeContainer);