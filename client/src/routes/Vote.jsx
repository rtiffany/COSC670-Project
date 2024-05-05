import { Link } from "react-router-dom";
import Poll from "../components/Vote/VotePage.jsx";

export default function Vote() {
    return (
        <>
            <h1>Live Polls</h1>
            <Poll/>
            <Link to="/">
                <button type="submit">Home</button>
            </Link>
        </>
    )
}