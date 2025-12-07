export function getStatusColor(status) {
    const colors = {
        Pending: "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300",
        Ongoing: "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300",
        "For Pickup/Delivery": "bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300",
        Completed: "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300",
    }
    return colors[status] || "bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-300"
}
  
export function formatDate(isoString) {
    const date = new Date(isoString)
    return date.toLocaleDateString("en-PH", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    })
}
  
export function formatCurrency(amount) {
    return new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
    }).format(amount)
}  