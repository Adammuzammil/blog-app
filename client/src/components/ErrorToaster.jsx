import { toast } from "react-hot-toast";

const ErrorToaster = ({ error }) => {
  // Enhanced error handling and formatting
  const formattedError =
    typeof error === "string" ? error : error.message || "An error occurred.";

  toast(
    (t) => (
      <div className="error-toast">
        <div className="icon">
          {/* Optionally replace with a custom error icon or image */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.47 2 2 6.47 2 12c0 5.53 4.47 10 10 10s10-4.47 10-10c0-5.53-4.47-10-10-10zm0 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm4.5-9H7v2h10.5v-2z" />
          </svg>
        </div>
        <div className="message">{formattedError}</div>
        <button onClick={() => t.dismiss()}>Dismiss</button>
      </div>
    ),
    {
      style: {
        boxShadow: "0 0 1px rgba(0, 0, 0, 0.15)",
        borderRadius: "4px",
        padding: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#ffb2b2",
        color: "#333",
        fontSize: "14px",
      },
      className: "custom-error-toast",
      iconTheme: { primary: "#f78a65", secondary: "#f78a65" },
      position: "bottom-right", // Adjust as needed
    }
  );
};

export default ErrorToaster;
