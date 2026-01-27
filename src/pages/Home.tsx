function Home() {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
    };


    return (
        <div>
            <h1>Welcome, {user.firstName}</h1>
            <p>You are logged in</p>
            <button type="submit" onClick={logout}>Logout</button>
        </div>
    );
}

export default Home;
