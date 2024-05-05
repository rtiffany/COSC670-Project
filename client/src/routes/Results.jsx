import { Link } from "react-router-dom";
import ResultPage from "../components/Results/ResultPage"

export default function Results() {
    return (
        <>
            <h1>Results</h1>
            <ResultPage/>
            <Link to="/">
                <button type="submit">Home</button>
            </Link>
        </>
    )
}