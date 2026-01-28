import Navbar from '../components/Navbar'
function Home() {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    return (
        <div>
            <Navbar />
            <h1 className="text-3xl font-bold text-blue-600">Welcome, {user.firstName}</h1>
            <p>You are logged in</p>
        </div>
    );
}

export default Home;
