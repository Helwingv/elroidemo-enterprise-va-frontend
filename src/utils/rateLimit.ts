interface RateLimitEntry {
  count: number;
  timestamp: number;
}

class RateLimit {
  private limits: Map<string, RateLimitEntry>;
  private readonly maxAttempts = 5;
  private readonly timeWindow = 15 * 60 * 1000; // 15 minutes

  constructor() {
    this.limits = new Map();
  }

  private getKey(action: string, identifier: string): string {
    return `${action}:${identifier}`;
  }

  checkLimit(action: string, identifier: string): boolean {
    const key = this.getKey(action, identifier);
    const entry = this.limits.get(key);

    if (!entry) {
      return true;
    }

    const now = Date.now();
    if (now - entry.timestamp > this.timeWindow) {
      this.limits.delete(key);
      return true;
    }

    return entry.count < this.maxAttempts;
  }

  increment(action: string, identifier: string): void {
    const key = this.getKey(action, identifier);
    const entry = this.limits.get(key);
    const now = Date.now();

    if (!entry || now - entry.timestamp > this.timeWindow) {
      this.limits.set(key, { count: 1, timestamp: now });
    } else {
      this.limits.set(key, {
        count: entry.count + 1,
        timestamp: entry.timestamp
      });
    }
  }

  reset(action: string, identifier: string): void {
    const key = this.getKey(action, identifier);
    this.limits.delete(key);
  }
}

export const rateLimit = new RateLimit();