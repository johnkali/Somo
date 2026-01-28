function Home() {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    return (

            <div className="space-y-6">
                <h1 className="text-3xl font-bold">Welcome, {user.firstName}</h1>
                <p className="text-gray-700">
                    Explore amazing blogs, create your own, and save your favorites.
                </p>

                {/* Example cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-4 shadow rounded">Blog Card 1</div>
                    <div className="bg-white p-4 shadow rounded">Blog Card 2</div>
                    <div className="bg-white p-4 shadow rounded">Blog Card 3</div>
                </div>
        </div>
    );
}

export default Home;
