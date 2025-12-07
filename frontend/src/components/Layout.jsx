export default function Layout({ currentView, setCurrentView, children }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800">
            <nav className="bg-white dark:bg-slate-800 shadow-lg border-b border-gray-200 dark:border-slate-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                                L
                            </div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">LaundryPro</h1>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setCurrentView("customer")}
                                className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
                                    currentView === "customer"
                                        ? "bg-blue-600 text-white shadow-lg"
                                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700"
                                }`}
                            >
                                Customer
                            </button>
                            <button
                                onClick={() => setCurrentView("staff")}
                                className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
                                    currentView === "staff"
                                        ? "bg-blue-600 text-white shadow-lg"
                                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700"
                                }`}
                            >
                                Staff
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
        </div>
    )
}