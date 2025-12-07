import { useState } from "react"
import { addBooking } from "@/utils/storage"
import { calculateFee } from "@/utils/calculator"

export default function BookingForm({ onClose }) {
    const [formData, setFormData] = useState({
        name: "",
        contactNumber: "",
        weight: "",
        serviceType: "wash",
        location: "proper",
        paymentMethod: "cash",
    })
    const [fee, setFee] = useState(0)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))

        if (name === "weight" || name === "serviceType" || name === "location") {
            const updatedForm = { ...formData, [name]: value }
            const calculatedFee = calculateFee(
                Number.parseFloat(updatedForm.weight) || 0,
                updatedForm.serviceType,
                updatedForm.location,
            )
            setFee(calculatedFee)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setError("")
        setSuccess("")

        if (!formData.name || !formData.contactNumber || !formData.weight) {
            setError("Please fill in all required fields")
            return
        }

        if (Number.parseFloat(formData.weight) <= 0) {
            setError("Weight must be greater than 0")
            return
        }

        const booking = {
            id: Date.now().toString(),
            ...formData,
            weight: Number.parseFloat(formData.weight),
            fee: calculateFee(Number.parseFloat(formData.weight), formData.serviceType, formData.location),
            status: "Pending",
            createdAt: new Date().toISOString(),
        }

        addBooking(booking)
        setSuccess("Booking created successfully!")
        setTimeout(() => {
            onClose()
        }, 1500)
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Create New Booking</h2>

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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            label="Full Name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                        <FormField
                            label="Contact Number"
                            name="contactNumber"
                            type="tel"
                            value={formData.contactNumber}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            label="Weight (kg)"
                            name="weight"
                            type="number"
                            step="0.1"
                            value={formData.weight}
                            onChange={handleInputChange}
                            required
                        />
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Service Type</label>
                            <select
                                name="serviceType"
                                value={formData.serviceType}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                            >
                                <option value="wash">Wash Only</option>
                                <option value="dry">Wash & Dry</option>
                                <option value="fold">Full Service (Wash, Dry & Fold)</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Location</label>
                            <select
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                            >
                                <option value="proper">Proper Location</option>
                                <option value="outside">Outside Proper</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Payment Method
                            </label>
                            <select
                                name="paymentMethod"
                                value={formData.paymentMethod}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                            >
                                <option value="cash">Cash</option>
                                <option value="gcash">GCash</option>
                                <option value="paypal">PayPal</option>
                                <option value="bank">Bank Transfer</option>
                            </select>
                        </div>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Estimated Service Fee</p>
                        <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">₱{fee.toFixed(2)}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                            Fee calculated based on weight, service type, and location
                        </p>
                    </div>

                    <div className="flex gap-4 pt-6">
                        <button
                            type="submit"
                            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all duration-200"
                        >
                            Confirm Booking
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 font-semibold py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-all duration-200"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

function FormField({ label, name, type, value, onChange, required, step }) {
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
                step={step}
                required={required}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
        </div>
    )
}