import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Dashboard from "@/components/Dashboard";
import BookingForm from "@/components/forms/BookingForm";
import StaffDashboard from "@/components/StaffDashboard";
import Login from "@/components/forms/LoginForm";
import SignupForm from "@/components/forms/SignupForm";
import CustomerPage from "@/components/CustomerPage"; 

export default function Home() {
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(true);
    const [showSignup, setShowSignup] = useState(false);
    const [currentView, setCurrentView] = useState("customer");
    const [showBookingForm, setShowBookingForm] = useState(false);
    const [refreshCallback, setRefreshCallback] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            const parsedUser = JSON.parse(savedUser);
            setUser(parsedUser);
            setShowLogin(false);

            if (parsedUser.role === "admin" || parsedUser.role === "staff") {
                setCurrentView("customer");
            }
        }
    }, []);

    const handleLogin = (loggedUser) => {
        setUser(loggedUser);
        localStorage.setItem("user", JSON.stringify(loggedUser));
        setShowLogin(false);
        if (loggedUser.role === "admin" || loggedUser.role === "staff") {
            setCurrentView("customer");
        }
    };

    const handleCreateBooking = (refresh) => {
        setRefreshCallback(() => refresh);
        setShowBookingForm(true);
    };

    const handleBookingFormClose = (wasSuccessful = false) => {  // Added: Pass success flag
        setShowBookingForm(false);
        if (wasSuccessful && refreshCallback) {  // Only refresh on success
            refreshCallback();
            setRefreshCallback(null);
        }
    };

    if (!user) {
        return (
            <>
                {showLogin && (
                    <Login
                        onClose={() => setShowLogin(false)}
                        onShowSignup={() => {
                            setShowLogin(false);
                            setShowSignup(true);
                        }}
                        onLoginSuccess={handleLogin}
                    />
                )}

                {showSignup && (
                    <SignupForm
                        onClose={() => {
                            setShowSignup(false);
                            setShowLogin(true);
                        }}
                    />
                )}
            </>
        );
    }

    // Customer role - separate page without navigation
    if (user.role === "customer") {
        return <CustomerPage user={user} setUser={setUser} />;
    }

    // Admin/Staff role - original setup with navigation
    return (
        <Layout 
            currentView={currentView} 
            setCurrentView={setCurrentView}
            setUser={setUser}
            currentRole={user.role}
        >
            {currentView === "customer" ? (
                <>
                    {!showBookingForm ? (
                        <Dashboard 
                            onCreateBooking={handleCreateBooking}
                            customerId={user.customerId}
                        />
                    ) : (
                        <BookingForm 
                            onClose={handleBookingFormClose}  // Updated: Pass handleBookingFormClose
                            user={user}  // Added: Pass user for auto customerId
                        />
                    )}
                </>
            ) : (
                <StaffDashboard />
            )}
        </Layout>
    );
}