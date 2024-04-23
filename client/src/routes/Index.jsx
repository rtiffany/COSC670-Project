import { Link } from "react-router-dom";

export default function Index() {
  return (
    <>
      {/* <Button>Configure Poll</Button> */}
      <h1>Decentralized Voting</h1>
      <form method="post">
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