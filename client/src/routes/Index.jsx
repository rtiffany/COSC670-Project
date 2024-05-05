import { Link } from "react-router-dom";
import ConnectWallet from "../components/ConnectWallet/ConnectWallet";

export default function Index() {
  return (
    <>
      {/* <Button>Configure Poll</Button> */}
      <h1>Decentralized Voting</h1>
      <form method="post">
        <ConnectWallet/>
      <Link to="configurePoll">
        <button type="submit">Configure Poll</button>
      </Link>
      <Link to="voterLogin">
        <button type="submit">Vote</button>
      </Link>
      </form>
    </>
  )
}