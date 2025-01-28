export class KSSCalculator {
    private buyPrice: number;
    private buyAmount: number;
  
    constructor(buyPrice: number, buyAmount: number) {
      this.buyPrice = buyPrice;
      this.buyAmount = buyAmount;
    }
  
    // Initial cost
    public Cost(): number {
      return this.buyPrice * this.buyAmount;
    }
  
    // Sell points for taking profit
    public firstProfit30(): number {
      return this.buyPrice * 1.3;
    }
  
    public secondProfit50(): number {
      return this.buyPrice * 1.5;
    }
  
    public thirdProfit80(): number {
      return this.buyPrice * 1.8;
    }
  
    public fourthProfit120(): number {
      return this.buyPrice * 2.2;
    }
  
    public fifthProfit150(): number {
      return this.buyPrice * 2.5;
    }
  
    // Stop loss calculation
    public stopLossPoint(): number {
      return this.buyPrice * 0.925;
    }
  
    public stopAmount(): number {
      return this.buyAmount / 2;
    }
  
    public stopSellAmount(): number {
      return this.stopAmount() * this.stopLossPoint();
    }
  
    // Rebuy calculations after a stop-loss
    public reBuyPoint(): number {
      return this.buyPrice * 0.6;
    }
  
    public reBuyAmount(): number {
      return this.stopSellAmount() / this.reBuyPoint();
    }
  
    public ortalamabuyPrice(): number {
      return (this.buyPrice + this.reBuyPoint()) / 2;
    }
  
    public finalAmount(): number {
      return this.reBuyAmount() + this.stopAmount();
    }
  }
  
  