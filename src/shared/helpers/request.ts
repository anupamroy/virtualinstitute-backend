namespace RequestProcessing {
  export const parseBody = <T>(body: string | null): T | null => {
    return body ? (JSON.parse(body) as T) : null;
  };
}
