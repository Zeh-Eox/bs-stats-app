import React, { useState } from "react";

const App: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const test = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/health");
      const json = await res.json();
      setData(json);
    } catch (error) {
      setData({ error: "Failed to fetch" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Backend Health Check
        </h1>

        <button
          onClick={test}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
        >
          {loading ? "Loading..." : "Test Backend"}
        </button>

        {data && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Response:
            </h2>
            <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-x-auto text-sm text-gray-800">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
