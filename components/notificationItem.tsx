// Inside your Notification component
function NotificationItem({ timestamp, message }: { timestamp: Date, message: string }) {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(timestamp);

  // For a "Time Ago" feel without libraries, you can use:
  const isToday = new Date().toDateString() === timestamp.toDateString();
  const displayTime = isToday ? `Today at ${formattedDate}` : timestamp.toLocaleDateString();

  return (
    <div className="p-3 border-b last:border-0">
      <p className="text-sm">{message}</p>
      <span className="text-[10px] text-muted-foreground">{displayTime}</span>
    </div>
  )
}
