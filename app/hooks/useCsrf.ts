import { useState, useEffect } from 'react';

interface CsrfState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

export function useCsrf() {
  const [state, setState] = useState<CsrfState>({
    token: null,
    loading: true,
    error: null,
  });

  const fetchCsrfToken = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const response = await fetch('/api/csrf', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch CSRF token: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.csrfToken) {
        throw new Error('No CSRF token received');
      }

      setState({
        token: data.csrfToken,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error('CSRF token fetch error:', error);
      setState({
        token: null,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch CSRF token',
      });
    }
  };

  useEffect(() => {
    fetchCsrfToken();
  }, []);

  const refreshToken = () => {
    fetchCsrfToken();
  };

  return {
    csrfToken: state.token,
    loading: state.loading,
    error: state.error,
    refreshToken,
  };
}
