// 'use client'

// import React, { ErrorInfo } from 'react';

// interface ErrorBoundaryProps {
//   children: React.ReactNode;
// }

// interface ErrorBoundaryState {
//   hasError: boolean;
// }

// class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
//   constructor(props: ErrorBoundaryProps) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   static getDerivedStateFromError(_: Error): ErrorBoundaryState {
//     return { hasError: true };
//   }

//   componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
//     // Log the error to an error reporting service
//     console.error('Error caught by ErrorBoundary:', error, errorInfo);
//     // You can also handle the error in other ways, like showing a custom error message
//   }

  

//   render() {

//     if (this.state.hasError) {
//       return <h1>Something went wrong.</h1>;
//     }

//     return this.props.children;
//   }
// }

// export default ErrorBoundary;
