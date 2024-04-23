import { Link } from "react-router-dom";
import './LinkButton.css';

export default function LinkButton({to, text, onSubmit}) {
    return (
        <Link id='linkButton' to={to}>
            <button type="submit" onSubmit={onSubmit}>{text}</button>
        </Link>
    );
}