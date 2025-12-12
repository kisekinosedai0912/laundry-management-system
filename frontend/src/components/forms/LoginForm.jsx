import { useState } from "react"

export default function LoginForm({ onClose, onLoginSuccess, onShowSignup }) {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setSuccess("")

        if (!formData.email || !formData.password) {
            setError("Please enter your email and password")
            return
        }

        try {
            const res = await fetch("https://laundry-management-system-32ft.onrender.com/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.message || "Login failed")
                return
            }

            setSuccess("Login successful!")

            // Notify parent
            if (onLoginSuccess) onLoginSuccess(data.user)

            setTimeout(() => onClose(), 1200)
        } catch (err) {
            setError("Server error. Please try again.")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 w-full max-w-lg">

                <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
                    Welcome Back
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 p-4 rounded-lg">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 p-4 rounded-lg">
                            {success}
                        </div>
                    )}

                    <FormField
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />

                    <FormField
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />

                    <div className="flex gap-4 pt-6">
                        <button
                            type="submit"
                            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all duration-200"
                        >
                            Log In
                        </button>
                    </div>
                </form>

                {/* SIGNUP LINK */}
                <p className="text-center text-gray-700 dark:text-gray-300 mt-6">
                    Don't have an account?{" "}
                    <button
                        onClick={() => {
                            onClose()
                            if (onShowSignup) onShowSignup()
                        }}
                        className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                    >
                        Sign up
                    </button>
                </p>
            </div>
        </div>
    )
}

function FormField({ label, name, type, value, onChange, required }) {
    return (
        <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
        </div>
    )
}