export interface Upgrade {
    upgrade_id: number;
    name: string;
    description: string;
    base_cost: number;
    cookie_increase_per_second: number;
  }
  
  export interface UserUpgrade {
    upgrade_id: number;
    quantity: number;
  }