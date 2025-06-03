import { useMutation as useReactQueryMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { handleApiError } from '@/lib/axios';

type MutationConfig<TData, TVariables> = Omit<
  UseMutationOptions<TData, AxiosError, TVariables>,
  'mutationFn'
> & {
  mutationFn: (variables: TVariables) => Promise<TData>;
  onSuccess?: (data: TData, variables: TVariables) => void | Promise<void>;
};

export const useMutation = <TData, TVariables>(
  config: MutationConfig<TData, TVariables>
) => {
  const { mutationFn, ...restConfig } = config;

  return useReactQueryMutation<TData, AxiosError, TVariables>({
    mutationFn,
    onError: (error: AxiosError) => {
      const { message } = handleApiError(error);
      // You can integrate with your toast/notification system here
      console.error(message);
    },
    ...restConfig,
  });
};
