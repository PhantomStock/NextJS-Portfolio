interface EmailTemplateProps {
  name: string
  email: string
  subject: string
  message: string
  timestamp: string
}

export function ContactEmailTemplate({ name, email, subject, message, timestamp }: EmailTemplateProps) {
  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        lineHeight: "1.6",
        color: "#333",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          padding: "30px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            borderBottom: "3px solid #3b82f6",
            paddingBottom: "20px",
            marginBottom: "30px",
          }}
        >
          <h1 style={{ color: "#1e40af", margin: "0", fontSize: "24px" }}>📬 New Contact Form Submission</h1>
          <p style={{ color: "#6b7280", margin: "5px 0 0 0", fontSize: "14px" }}>From your portfolio website</p>
        </div>

        <div style={{ marginBottom: "30px" }}>
          <div
            style={{
              marginBottom: "20px",
              padding: "15px",
              backgroundColor: "#f8fafc",
              borderRadius: "8px",
              borderLeft: "4px solid #3b82f6",
            }}
          >
            <div
              style={{
                fontWeight: "600",
                color: "#374151",
                marginBottom: "5px",
                fontSize: "14px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              👤 Name
            </div>
            <div style={{ color: "#1f2937", fontSize: "16px", wordWrap: "break-word" }}>{name}</div>
          </div>

          <div
            style={{
              marginBottom: "20px",
              padding: "15px",
              backgroundColor: "#f8fafc",
              borderRadius: "8px",
              borderLeft: "4px solid #3b82f6",
            }}
          >
            <div
              style={{
                fontWeight: "600",
                color: "#374151",
                marginBottom: "5px",
                fontSize: "14px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              📧 Email
            </div>
            <div style={{ color: "#1f2937", fontSize: "16px", wordWrap: "break-word" }}>
              <a href={`mailto:${email}`} style={{ color: "#3b82f6", textDecoration: "none" }}>
                {email}
              </a>
            </div>
          </div>

          <div
            style={{
              marginBottom: "20px",
              padding: "15px",
              backgroundColor: "#f8fafc",
              borderRadius: "8px",
              borderLeft: "4px solid #3b82f6",
            }}
          >
            <div
              style={{
                fontWeight: "600",
                color: "#374151",
                marginBottom: "5px",
                fontSize: "14px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              📝 Subject
            </div>
            <div style={{ color: "#1f2937", fontSize: "16px", wordWrap: "break-word" }}>{subject}</div>
          </div>

          <div
            style={{
              marginBottom: "20px",
              padding: "15px",
              backgroundColor: "#f8fafc",
              borderRadius: "8px",
              borderLeft: "4px solid #10b981",
            }}
          >
            <div
              style={{
                fontWeight: "600",
                color: "#374151",
                marginBottom: "5px",
                fontSize: "14px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              💬 Message
            </div>
            <div
              style={{
                color: "#1f2937",
                fontSize: "16px",
                wordWrap: "break-word",
                whiteSpace: "pre-wrap",
                lineHeight: "1.8",
              }}
            >
              {message}
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#f0fdf4",
            border: "1px solid #dcfce7",
            borderRadius: "6px",
            padding: "15px",
            marginTop: "20px",
          }}
        >
          <h3 style={{ color: "#166534", margin: "0 0 10px 0", fontSize: "14px" }}>💡 Quick Reply</h3>
          <p style={{ color: "#15803d", margin: "0", fontSize: "13px" }}>
            You can reply directly to this email to respond to {name}. The reply-to address is already set to their
            email.
          </p>
        </div>

        <div
          style={{
            backgroundColor: "#eff6ff",
            border: "1px solid #dbeafe",
            borderRadius: "6px",
            padding: "10px",
            textAlign: "center",
            fontSize: "12px",
            color: "#1e40af",
            marginTop: "20px",
          }}
        >
          📅 Received on {timestamp}
        </div>

        <div
          style={{
            borderTop: "1px solid #e5e7eb",
            paddingTop: "20px",
            textAlign: "center",
            color: "#6b7280",
            fontSize: "12px",
          }}
        >
          <p>This email was sent from the contact form on your portfolio website.</p>
          <p>
            <strong>Wilson Tsuyoshi Oliveira Campos</strong> | Computer Science Student
          </p>
          <p>Instituto Politécnico de Leiria</p>
        </div>
      </div>
    </div>
  )
}
