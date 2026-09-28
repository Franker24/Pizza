import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#121110] text-[#EDE8E1] flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-[#E52421]/20 border border-[#E52421] text-[#E52421] flex items-center justify-center text-3xl mb-4">
            🍕
          </div>
          <h2 className="text-2xl font-serif font-black uppercase text-white mb-2">
            La masa se está horneando
          </h2>
          <p className="text-stone-400 text-sm max-w-md mb-6">
            Ocurrió un detalle temporal al cargar la vista. Hacé click abajo para reanudar la experiencia.
          </p>
          <button
            type="button"
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.reload();
            }}
            className="px-6 py-3 rounded-full bg-[#F9BA15] hover:bg-[#ffc82a] text-black font-extrabold text-sm tracking-wide shadow-lg transition-transform active:scale-95 cursor-pointer"
          >
            Recargar la página
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
