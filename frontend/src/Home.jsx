import { useState } from "react"
import Layout from "@/components/Layout"
import Dashboard from "@/components/Dashboard"
import BookingForm from "@/components/forms/BookingForm"
import StaffDashboard from "@/components/StaffDashboard"

export default function Home() {
    const [currentView, setCurrentView] = useState("customer")
    const [showBookingForm, setShowBookingForm] = useState(false)

    return (
        <Layout currentView={currentView} setCurrentView={setCurrentView}>
            {currentView === "customer" ? (
                <>
                {!showBookingForm ? (
                    <Dashboard onCreateBooking={() => setShowBookingForm(true)} />
                ) : (
                    <BookingForm onClose={() => setShowBookingForm(false)} />
                )}
                </>
            ) : (
                <StaffDashboard />
            )}
        </Layout>
    )
}