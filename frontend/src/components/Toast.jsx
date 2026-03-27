export default function Toast({ toasts, onClose }) {
  return (
    <div className="toast-container" aria-live="polite" aria-atomic="true">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast-item toast-item-${toast.tone}`} role="status">
          <span>{toast.message}</span>
          <button
            type="button"
            className="toast-item-close"
            aria-label="Close notification"
            onClick={() => onClose(toast.id)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
