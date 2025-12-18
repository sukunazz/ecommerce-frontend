export default function Body() {
  return (
    <div className="min-h-screen w-full bg-linear-to-br from-amber-50 via-amber-50 to-amber-200 flex items-center px-10 text-white ">
      {/* Left Section */}
      <div className="flex-1 space-y-6 bg-amber-50">
        <h2 className="text-5xl font-bold drop-shadow-lg">
          Explore More Features
        </h2>

        <p className="max-w-xl text-lg text-gray-300 ">
          This section blends perfectly with grey tones. You can place your
          content here and maintain a modern, minimal, and professional
          aesthetic.
        </p>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex justify-end bg-amber-300">
        <button className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition">
          Learn More
        </button>
      </div>
    </div>
  );
}
