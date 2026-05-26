import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary] Uncaught error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    this.props.onReset?.();
  };

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-anarchy-dark flex items-center justify-center px-6">
          <div className="max-w-md w-full text-center">
            <div className="w-20 h-20 rounded-full bg-anarchy-red/10 flex items-center justify-center mx-auto mb-6">
              <AlertTriangle size={40} className="text-anarchy-red" />
            </div>
            
            <h1 className="text-3xl font-bold text-white mb-4">
              Something went wrong
            </h1>
            
            <p className="text-gray-400 mb-8">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>

            {import.meta.env.DEV && this.state.errorInfo && (
              <details className="text-left mb-8 bg-anarchy-gray/50 rounded-xl p-4 text-sm">
                <summary className="cursor-pointer text-anarchy-red font-medium mb-2">
                  Error Details (Development Only)
                </summary>
                <pre className="text-gray-400 text-xs overflow-auto max-h-40">
                  {this.state.error?.stack}
                  {'\n'}
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button 
                onClick={this.handleReset}
                className="btn-shimmer bg-anarchy-red text-white px-6 py-3 rounded-xl font-semibold hover:bg-anarchy-red/90 transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw size={18} />
                Try Again
              </button>
              
              <button 
                onClick={this.handleReload}
                className="px-6 py-3 rounded-xl font-semibold border border-white/20 text-white hover:bg-white/5 transition-colors"
              >
                Reload Page
              </button>
              
              <button 
                onClick={this.handleGoHome}
                className="px-6 py-3 rounded-xl font-semibold border border-white/20 text-white hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
              >
                <Home size={18} />
                Go Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
