const Profile = () => {
    return (
        <div className="flex flex-col md:flex-row min-h-lvh">
            <div className="w-full md:w-1/4 bg-gray-100 p-5 border-r border-gray-200">
                <div className="space-y-4">
                    <div className="bg-white text-black p-4 rounded-lg shadow-sm hover:translate-x-1 transition-all cursor-pointer">
                        Menu Item 1
                    </div>
                    <div className="bg-white text-black  p-4 rounded-lg shadow-sm hover:translate-x-1 transition-all cursor-pointer">
                        Menu Item 2
                    </div>
                    <div className="bg-white text-black p-4 rounded-lg shadow-sm hover:translate-x-1 transition-all cursor-pointer">
                        Menu Item 3
                    </div>
                    <div className="bg-white text-black p-4 rounded-lg shadow-sm hover:translate-x-1 transition-all cursor-pointer">
                        Menu Item 4
                    </div>
                </div>
            </div>

            <div className="flex-1 p-8 bg-white text-black">
                <h1 className="text-2xl font-bold mb-4">Main Content Area</h1>
                <p className="text-gray-600">This is the main viewport section. Your content goes here.</p>
            </div>
        </div>
    )
} 

export default Profile;
