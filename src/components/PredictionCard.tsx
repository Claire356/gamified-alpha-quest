import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Timer, Zap } from "lucide-react";

interface PredictionCardProps {
  asset: string;
  currentPrice: number;
  timeLeft: number;
  onPredict: (prediction: 'up' | 'down') => void;
  isActive: boolean;
}

export const PredictionCard = ({ 
  asset, 
  currentPrice, 
  timeLeft, 
  onPredict, 
  isActive 
}: PredictionCardProps) => {
  const [prediction, setPrediction] = useState<'up' | 'down' | null>(null);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePredict = (direction: 'up' | 'down') => {
    if (!isActive) return;
    setPrediction(direction);
    onPredict(direction);
  };

  return (
    <Card className="p-6 gradient-card border-border/50 transition-smooth hover:shadow-glow">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-bold text-foreground">{asset}</h3>
          </div>
          <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
            <Timer className="w-3 h-3 mr-1" />
            {formatTime(timeLeft)}
          </Badge>
        </div>

        {/* Current Price */}
        <div className="text-center space-y-1">
          <p className="text-sm text-muted-foreground">Current Price</p>
          <p className="text-2xl font-bold text-foreground">
            ${currentPrice.toLocaleString()}
          </p>
        </div>

        {/* Prediction Question */}
        <div className="text-center space-y-2">
          <p className="text-muted-foreground">
            Will {asset} go up or down in the next 24 hours?
          </p>
        </div>

        {/* Prediction Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => handlePredict('up')}
            disabled={!isActive || prediction !== null}
            variant={prediction === 'up' ? 'default' : 'outline'}
            className={`h-12 font-semibold transition-bouncy ${
              prediction === 'up' 
                ? 'gradient-success shadow-glow' 
                : 'hover:bg-success/10 hover:border-success/30'
            }`}
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            UP 📈
          </Button>
          
          <Button
            onClick={() => handlePredict('down')}
            disabled={!isActive || prediction !== null}
            variant={prediction === 'down' ? 'default' : 'outline'}
            className={`h-12 font-semibold transition-bouncy ${
              prediction === 'down' 
                ? 'bg-destructive hover:bg-destructive/90 shadow-glow' 
                : 'hover:bg-destructive/10 hover:border-destructive/30'
            }`}
          >
            <TrendingDown className="w-4 h-4 mr-2" />
            DOWN 📉
          </Button>
        </div>

        {/* Prediction Status */}
        {prediction && (
          <div className="text-center p-3 rounded-lg bg-accent/10 border border-accent/20">
            <p className="text-sm text-accent">
              🎯 You predicted {asset} will go <strong>{prediction.toUpperCase()}</strong>!
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};