import {useEffect, useState} from "react";
import api from "../services/api.ts";

const Profile = () => {
    const [profile, setProfile] = useState<any>(null);

    useEffect(() => {
        const fetchProfile =  async ()=>{
            const res = await api.get("/users/profile");

            setProfile(res.data);
            // console.log(res.data);
        };
        fetchProfile();
    }, []);

    if (!profile) {
        return <p>Loading profile...</p>
    }
    const {user, blogs, blogCount} = profile;

    return (
        <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
        {/*    User info*/}
            <section className="bg-white p-6 rounded shadow">
                <h2 className="text-2xl font-bold mb-2">
                    {user.firstName} {user.secondName}
                </h2>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-600">Last Login: {new Date(user.lastLogin).toDateString()}</p>
                <p className="mt-2 font-medium">Blogs Created: {blogCount}</p>
            </section>

        {/*    User blogs*/}
            <section>
                <h3 className="text-xl font-semibold mb-4">My Blogs</h3>

                {blogs.length === 0 ? (
                    <p className="text-gray-500">You haven't written any blogs yet!</p>
                ):(
                    <div className="grid md:grid-cols-2 gap-6">
                        {blogs.map((blog: any)=>(
                            <div key={blog._id} className="border p-4 rounded">
                                <h4 className="font-bold">{blog.title}</h4>
                                <p className="text-sm text-gray-500">
                                    {new Date(blog.createdAt).toDateString()}
                                </p>
                                <p className="text-gray-600 mt-2">
                                    {blog.content.substring(0, 120)}...
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/*Favorites*/}
            <section>
                <h3 className="text-xl font-semibold mb-4">Saved Blogs</h3>
                {user.favorites.length === 0 ? (
                    <p className="text-gray-500">No saved blogs yet.</p>
                ): (
                    <div className="grid md:grid-cols-2 gap-6">
                        {user.favorites.map((blog: any)=>(
                            <div key={blog._id} className="border p-4 rounded">
                                <h4 className="font-bold">{blog.title}</h4>
                                <p className="text-sm text-gray-500">
                                    {blog.content.substring(0, 120)}...
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default Profile;