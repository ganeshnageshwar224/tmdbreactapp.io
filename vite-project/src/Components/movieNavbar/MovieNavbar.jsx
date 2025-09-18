import { Link, useNavigate } from "react-router-dom";
import "./MovieNavbar.css";
import { useEffect, useState } from "react";

const MovieNavbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const apiKey = localStorage.getItem("tmdb_api_key");
    const sessionId = localStorage.getItem("tmdb_session_id");

    if (apiKey && sessionId) {
      fetch(
        `https://api.themoviedb.org/3/account?api_key=${apiKey}&session_id=${sessionId}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data && data.username) {
            setUser(data);
          }
        })
        .catch((err) => console.error("Failed to fetch user:", err));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("tmdb_session_id");
    localStorage.removeItem("tmdb_api_key");
    setUser(null);
    navigate("/");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid custom-container">
          <Link className="navbar-brand" to="#">
            TMDB
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  Movies
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  TV Shows
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  People
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  More
                </Link>
              </li>
            </ul>

            {/* Right Side */}
            <div className="d-flex align-items-center">
              <form className="d-flex me-3" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>

              {/* User Avatar + Logout */}
              {user ? (
                <div className="dropdown">
                  <button
                    className="btn btn-warning rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: "40px", height: "40px" }}
                    id="userMenu"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {user.username.charAt(0).toUpperCase()}
                  </button>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="userMenu"
                  >
                    <li>
                      <span className="dropdown-item-text">
                        {user.username}
                      </span>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link className="btn btn-primary" to="/">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MovieNavbar;
