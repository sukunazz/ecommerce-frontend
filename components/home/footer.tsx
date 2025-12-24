export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-200 py-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-3">Booksville</h3>
          <p className="text-sm text-gray-400">
            Discover books with our modern and easy-to-use platform.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Links</h3>
          <ul className="space-y-2 text-sm">
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <p className="text-sm text-gray-400">
            Instagram • Facebook • Twitter
          </p>
        </div>
      </div>

      <div className="text-center text-gray-500 text-xs mt-10">
        © 2025 Booksville. All rights reserved.
      </div>
    </footer>
  );
}
