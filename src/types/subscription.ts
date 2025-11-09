/**
 * Subscription Plan Interface
 * Defines the structure for subscription pricing
 */
export interface SubscriptionPlan {
  trialHours: number;          // 24 timers gratis prøve
  basePricePerChild: number;   // 45 kr pr. barn
  extraChildFee: number;       // 15 kr pr. ekstra barn
  includedChildren: number;    // 1 barn inkluderet
}

/**
 * Default subscription plan
 */
export const DEFAULT_PLAN: SubscriptionPlan = {
  trialHours: 24,
  basePricePerChild: 45,
  extraChildFee: 15,
  includedChildren: 1,
};

/**
 * Calculate trial end time
 * @param hours Number of hours for trial period
 * @returns Date object representing trial end time
 */
export function calculateTrialEnd(hours: number): Date {
  const trialEnd = new Date();
  trialEnd.setHours(trialEnd.getHours() + hours);
  return trialEnd;
}

/**
 * Calculate total subscription price based on number of children
 * @param children Number of children
 * @param plan Subscription plan (defaults to DEFAULT_PLAN)
 * @returns Total price in DKK
 */
export function calculateTotal(children: number, plan: SubscriptionPlan = DEFAULT_PLAN): number {
  const extra = Math.max(0, children - plan.includedChildren);
  return plan.basePricePerChild + extra * plan.extraChildFee;
}
