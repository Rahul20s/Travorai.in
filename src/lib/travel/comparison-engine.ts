import type { BaseTravelOption } from "./types";

export class ComparisonEngine {
  /**
   * Evaluates an array of travel options and assigns ComparisonLabels (BEST PRICE, FASTEST, BEST VALUE).
   * @param options The normalized options array.
   * @param priceWeight The weighting given to price vs duration when calculating best value.
   */
  static evaluate<T extends BaseTravelOption & { durationMinutes?: number }>(
    options: T[],
    priceWeight: number = 0.5
  ): T[] {
    if (!options || options.length === 0) return [];

    // Clone the array so we don't mutate the caller's reference directly,
    // though we are mutating the inner objects slightly to add labels.
    const evaluated = options.map((opt) => ({ ...opt, comparisonLabels: [] as string[] }));

    // 1. Find Best Price
    let minPrice = Infinity;
    evaluated.forEach((opt) => {
      if (opt.price < minPrice) minPrice = opt.price;
    });
    
    // Assign Best Price
    evaluated.forEach((opt) => {
      if (opt.price === minPrice) {
        opt.comparisonLabels.push("BEST PRICE");
      }
    });

    // 2. Find Fastest (if duration is available)
    const hasDuration = evaluated.some(opt => opt.durationMinutes !== undefined);
    if (hasDuration) {
      let minDuration = Infinity;
      evaluated.forEach((opt) => {
        if (opt.durationMinutes !== undefined && opt.durationMinutes < minDuration) {
          minDuration = opt.durationMinutes;
        }
      });

      evaluated.forEach((opt) => {
        if (opt.durationMinutes === minDuration) {
          opt.comparisonLabels.push("FASTEST");
        }
      });
    }

    // 3. Find Best Value
    // Best value is a normalized score of Price and Duration.
    // Score = (Price / minPrice) * priceWeight + (Duration / minDuration) * (1 - priceWeight)
    // Lowest score wins.
    if (hasDuration && evaluated.length > 1) {
      const minDuration = Math.min(...evaluated.map(o => o.durationMinutes || Infinity));
      let bestScore = Infinity;
      
      evaluated.forEach((opt) => {
        const pRatio = opt.price / minPrice;
        const dRatio = opt.durationMinutes ? opt.durationMinutes / minDuration : 1;
        const score = (pRatio * priceWeight) + (dRatio * (1 - priceWeight));
        // attach temporary score for finding the minimum
        (opt as any)._score = score;
        if (score < bestScore) bestScore = score;
      });

      evaluated.forEach((opt) => {
        if ((opt as any)._score === bestScore) {
          opt.comparisonLabels.push("BEST VALUE");
        }
        delete (opt as any)._score;
      });
    }

    // 4. Mark Recommended (Usually Best Value, fallback to Best Price)
    const hasBestValue = evaluated.some(opt => opt.comparisonLabels.includes("BEST VALUE"));
    if (hasBestValue) {
      evaluated.forEach((opt) => {
        if (opt.comparisonLabels.includes("BEST VALUE")) {
          opt.comparisonLabels.push("RECOMMENDED");
        }
      });
    } else {
      evaluated.forEach((opt) => {
        if (opt.comparisonLabels.includes("BEST PRICE")) {
          opt.comparisonLabels.push("RECOMMENDED");
        }
      });
    }

    return evaluated as unknown as T[];
  }
}
