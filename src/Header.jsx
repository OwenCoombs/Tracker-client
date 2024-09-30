import { Link } from "react-router-dom"

function Header() {
  return (
    <div>
            <nav className="bottom-nav">
        <Link to="/">Home</Link>
        <Link to="/tasks">Tasks</Link>
        <button>Profile</button>
      </nav>
    </div>
  )
}

export default Header