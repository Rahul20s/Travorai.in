export interface BudgetState {
  allocated: number;
  spent: {
    transport: number;
    accommodation: number;
    activities: number;
    food: number;
    localTransport: number;
    misc: number;
  };
  totalSpent: number;
  remaining: number;
  projected: number;
}

export class BudgetEngine {
  static calculate(
    allocated: number,
    selectedItems: {
      transportPrice?: number;
      accommodationPrice?: number;
      activitiesPrice?: number;
      foodPrice?: number;
      localTransportPrice?: number;
      miscPrice?: number;
    }
  ): BudgetState {
    const spent = {
      transport: selectedItems.transportPrice || 0,
      accommodation: selectedItems.accommodationPrice || 0,
      activities: selectedItems.activitiesPrice || 0,
      food: selectedItems.foodPrice || 0,
      localTransport: selectedItems.localTransportPrice || 0,
      misc: selectedItems.miscPrice || 0,
    };

    const totalSpent = Object.values(spent).reduce((sum, val) => sum + val, 0);
    const projected = totalSpent; // For now, projected is what we've committed to.
    const remaining = allocated - totalSpent;

    return {
      allocated,
      spent,
      totalSpent,
      remaining,
      projected,
    };
  }
}
