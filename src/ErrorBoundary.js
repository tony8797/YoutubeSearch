import React from 'react';
class ErrorBoundary extends React.Component {
  // 頁面載入若失敗則顯示 loading failed 反之則渲染 this.props.children
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <p>Loading failed! Please reload.</p>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
