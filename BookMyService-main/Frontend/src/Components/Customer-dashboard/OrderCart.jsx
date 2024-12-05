import { useParams } from 'react-router-dom';
const OrderCart=()=>{
    const { id } = useParams();
    return(
        <>
            <h1>{localStorage.getItem("date")}</h1>
            <h1>{localStorage.getItem("time")}</h1>
            <h1>{localStorage.getItem("day")}</h1>
            <h1>{localStorage.getItem("_ID")}</h1>
            <h1>{id}</h1>
        </>
    );
}
export default OrderCart