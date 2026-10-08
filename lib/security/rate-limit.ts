const buckets = new Map<string, { count: number; resetAt: number }>();

/** Fixed-window in-memory limiter. Single-instance only; replace with Redis when scaling out. */
export function allowAttempt(key: string, limit: number, windowMs: number, nowMs = Date.now()): boolean {
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= nowMs) {
    buckets.set(key, { count: 1, resetAt: nowMs + windowMs });
    return true;
  }
  bucket.count += 1;
  return bucket.count <= limit;
}
