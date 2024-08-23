'use client'

export default function HomePage() {
  return (
    <main className="p-5 h-screen bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center">
      <section className="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-4 ">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Bienvenido a Nuestra Página
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <div className="flex justify-center">
          <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
            Aprende Más
          </button>
        </div>
      </section>

    </main>
  );
}
