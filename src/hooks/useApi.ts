/**
 * Custom hooks for API interactions
 */

import { useState, useEffect, useCallback } from 'react';
import api from '@/lib/api';

// Type definitions
export class APIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'APIError';
  }
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Hook for fetching data from API
 */
export function useApi<T>(
  endpoint: string,
  options?: {
    skip?: boolean;
    onSuccess?: (data: T) => void;
    onError?: (error: string) => void;
  }
): UseApiState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(!options?.skip);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (options?.skip) return;

    setLoading(true);
    setError(null);

    try {
      const response = await api.get<ApiResponse<T>>(endpoint);
      const apiResponse = response.data;

      if (apiResponse.success && apiResponse.data) {
        setData(apiResponse.data);
        options?.onSuccess?.(apiResponse.data);
      } else {
        const errorMsg = apiResponse.error || 'Failed to fetch data';
        setError(errorMsg);
        options?.onError?.(errorMsg);
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMsg);
      options?.onError?.(errorMsg);
    } finally {
      setLoading(false);
    }
  }, [endpoint, options?.skip]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

/**
 * Hook for mutations (POST, PUT, DELETE, etc.)
 */
interface UseMutationState<T> {
  mutate: (data?: any) => Promise<T | null>;
  data: T | null;
  loading: boolean;
  error: string | null;
  reset: () => void;
}

export function useMutation<T>(
  endpoint: string,
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'POST',
  options?: {
    onSuccess?: (data: T) => void;
    onError?: (error: string) => void;
  }
): UseMutationState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(
    async (payload?: any): Promise<T | null> => {
      setLoading(true);
      setError(null);

      try {
        let axiosResponse;

        switch (method) {
          case 'POST':
            axiosResponse = await api.post<ApiResponse<T>>(endpoint, payload);
            break;
          case 'PUT':
            axiosResponse = await api.put<ApiResponse<T>>(endpoint, payload);
            break;
          case 'PATCH':
            axiosResponse = await api.patch<ApiResponse<T>>(endpoint, payload);
            break;
          case 'DELETE':
            axiosResponse = await api.delete<ApiResponse<T>>(endpoint);
            break;
        }

        const response = axiosResponse.data;

        if (response.success && response.data) {
          setData(response.data);
          options?.onSuccess?.(response.data);
          return response.data;
        } else {
          const errorMsg = response.error || 'Mutation failed';
          setError(errorMsg);
          options?.onError?.(errorMsg);
          return null;
        }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'An error occurred';
        setError(errorMsg);
        options?.onError?.(errorMsg);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [endpoint, method, options]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { mutate, data, loading, error, reset };
}

/**
 * Hook for form handling with validation
 */
interface UseFormOptions<T> {
  initialValues: T;
  validate?: (values: T) => Record<string, string>;
  onSubmit: (values: T) => Promise<void>;
}

interface UseFormState<T> {
  values: T;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  handleChange: (field: keyof T, value: any) => void;
  handleBlur: (field: keyof T) => void;
  handleSubmit: (e?: React.FormEvent) => Promise<void>;
  resetForm: () => void;
  setFieldError: (field: keyof T, error: string) => void;
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  validate,
  onSubmit,
}: UseFormOptions<T>): UseFormState<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((field: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field as string]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field as string];
        return newErrors;
      });
    }
  }, [errors]);

  const handleBlur = useCallback((field: keyof T) => {
    setTouched(prev => ({ ...prev, [field]: true }));

    // Validate field on blur
    if (validate) {
      const fieldErrors = validate(values);
      if (fieldErrors[field as string]) {
        setErrors(prev => ({ ...prev, [field]: fieldErrors[field as string] }));
      }
    }
  }, [validate, values]);

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();

      setIsSubmitting(true);

      // Mark all fields as touched
      const allTouched = Object.keys(values).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {}
      );
      setTouched(allTouched);

      // Validate all fields
      if (validate) {
        const formErrors = validate(values);
        if (Object.keys(formErrors).length > 0) {
          setErrors(formErrors);
          setIsSubmitting(false);
          return;
        }
      }

      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, validate, onSubmit]
  );

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  const setFieldError = useCallback((field: keyof T, error: string) => {
    setErrors(prev => ({ ...prev, [field]: error }));
  }, []);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldError,
  };
}
