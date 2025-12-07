import { useState } from "react";

export default function NotificationCenter({ notifications }) {
  const [dismissed, setDismissed] = useState(new Set());

    const getIcon = (type) => {
        switch (type) {
            case "success":
                return "✓";
            case "error":
                return "✕";
            case "warning":
                return "!";
            case "info":
            default:
                return "ℹ";
        }
    };

    const getColor = (type) => {
        switch (type) {
            case "success":
                return "bg-green-100 border-green-400 text-green-800";
            case "error":
                return "bg-red-100 border-red-400 text-red-800";
            case "warning":
                return "bg-yellow-100 border-yellow-400 text-yellow-800";
            case "info":
            default:
                return "bg-blue-100 border-blue-400 text-blue-800";
        }
    };

    const visibleNotifications = notifications.filter(
        (n) => !dismissed.has(n.id)
    );

    if (visibleNotifications.length === 0) return null;

    return (
        <div className="space-y-2">
            {visibleNotifications.map((notification) => (
                <div
                key={notification.id}
                className={`p-4 border-l-4 rounded flex justify-between items-start ${getColor(
                    notification.type
                )}`}
                >
                <div className="flex items-start gap-3">
                    <span className="font-bold text-lg">{getIcon(notification.type)}</span>
                    <div>
                        <p className="font-semibold">{notification.message}</p>
                        <p className="text-xs opacity-75 mt-1">
                            {new Date(notification.timestamp).toLocaleTimeString()}
                        </p>
                    </div>
                </div>

                <button
                    onClick={() =>
                        setDismissed((prev) => {
                            const updated = new Set(prev);
                            updated.add(notification.id);
                            return updated;
                        })
                    }
                    className="text-lg hover:opacity-70 transition"
                >
                    ×s
                </button>
                </div>
            ))}
        </div>
    );
}