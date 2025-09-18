import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, CheckCircle, XCircle, Lightbulb } from "lucide-react";

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: {
    asset: string;
    prediction: 'up' | 'down';
    actualDirection: 'up' | 'down';
    isCorrect: boolean;
    startPrice: number;
    endPrice: number;
    pointsEarned: number;
  } | null;
}

export const ResultModal = ({ isOpen, onClose, result }: ResultModalProps) => {
  if (!result) return null;

  const priceChange = result.endPrice - result.startPrice;
  const priceChangePercent = ((priceChange / result.startPrice) * 100);

  const tips = [
    "📊 Check market trends before predicting",
    "📰 Follow financial news for better insights", 
    "🎯 Technical analysis can help predict short-term moves",
    "⚖️ Remember: higher volatility = higher risk and reward",
    "🧠 Learn from both wins and losses to improve"
  ];

  const randomTip = tips[Math.floor(Math.random() * tips.length)];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto gradient-card border-border/50">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            {result.isCorrect ? "🎉 Correct Prediction!" : "😅 Better Luck Next Time!"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Result Summary */}
          <div className="text-center space-y-3">
            <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center ${
              result.isCorrect ? 'gradient-success' : 'bg-destructive'
            }`}>
              {result.isCorrect ? (
                <CheckCircle className="w-8 h-8 text-success-foreground" />
              ) : (
                <XCircle className="w-8 h-8 text-destructive-foreground" />
              )}
            </div>
            
            <h3 className="text-lg font-semibold text-foreground">
              {result.asset} Result
            </h3>
          </div>

          {/* Price Movement */}
          <div className="bg-muted/20 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Start Price:</span>
              <span className="font-medium">${result.startPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">End Price:</span>
              <span className="font-medium">${result.endPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Change:</span>
              <div className="flex items-center gap-1">
                {result.actualDirection === 'up' ? (
                  <TrendingUp className="w-3 h-3 text-success" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-destructive" />
                )}
                <span className={`font-medium ${
                  result.actualDirection === 'up' ? 'text-success' : 'text-destructive'
                }`}>
                  {priceChangePercent > 0 ? '+' : ''}{priceChangePercent.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>

          {/* Prediction vs Reality */}
          <div className="flex justify-center gap-4">
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Your Prediction</p>
              <Badge variant="outline" className={`${
                result.prediction === 'up' ? 'border-success/30 text-success' : 'border-destructive/30 text-destructive'
              }`}>
                {result.prediction === 'up' ? '📈 UP' : '📉 DOWN'}
              </Badge>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Actual Result</p>
              <Badge variant="outline" className={`${
                result.actualDirection === 'up' ? 'border-success/30 text-success' : 'border-destructive/30 text-destructive'
              }`}>
                {result.actualDirection === 'up' ? '📈 UP' : '📉 DOWN'}
              </Badge>
            </div>
          </div>

          {/* Points Earned */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full gradient-primary">
              <span className="text-primary-foreground font-semibold">
                +{result.pointsEarned} Points! ⭐
              </span>
            </div>
          </div>

          {/* Educational Tip */}
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-medium text-accent mb-1">💡 Learning Tip</p>
                <p className="text-xs text-muted-foreground">{randomTip}</p>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <Button 
            onClick={onClose}
            className="w-full gradient-primary font-semibold transition-bouncy"
          >
            Continue Playing 🚀
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};