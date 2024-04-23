import { Link } from "react-router-dom";
import Poll from "../components/Poll/Poll.jsx";

export default function Vote() {
    return (
        <>
            <h1>Vote!</h1>
            <Poll/>
            <Link to="/">
                <button type="submit">Home</button>
            </Link>
        </>
    )
}