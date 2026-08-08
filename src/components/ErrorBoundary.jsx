import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{
          maxWidth: 760,
          margin: "80px auto",
          padding: 24,
          fontFamily: "system-ui, sans-serif",
          color: "#18202a",
        }}>
          <h1>ShopSphere could not start</h1>
          <p>The browser reported this error:</p>
          <pre style={{
            whiteSpace: "pre-wrap",
            background: "#f4f1ec",
            padding: 16,
            borderRadius: 12,
            overflow: "auto",
          }}>
            {this.state.error.stack || this.state.error.message}
          </pre>
          <p>Check that <strong>npm install</strong> completed successfully, then restart <strong>npm run dev</strong>.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
