import { TranslateService } from '@ngx-translate/core';

export function processApiError(err: any, translate: TranslateService): string {
  const apiError = err?.error;

  if (Array.isArray(apiError?.errors)) {
    const message = apiError.errors
      .map(
        (e: { field: string; message: string }) => `${e.field}: ${e.message}`,
      )
      .join('\n');

    return message;
  }

  const fallbackMessage =
    apiError?.detail ||
    apiError?.message ||
    translate.instant('MSG.REST.ERROR', {
      resource: translate.instant('COMMON.CHARACTER'),
    });

  return fallbackMessage;
}
