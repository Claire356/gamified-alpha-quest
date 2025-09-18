import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Flame, Star, Target } from "lucide-react";

interface GameStatsProps {
  score: number;
  streak: number;
  correctPredictions: number;
  totalPredictions: number;
}

export const GameStats = ({ 
  score, 
  streak, 
  correctPredictions, 
  totalPredictions 
}: GameStatsProps) => {
  const accuracy = totalPredictions > 0 ? (correctPredictions / totalPredictions * 100) : 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {/* Score */}
      <Card className="p-4 gradient-card border-border/50 text-center">
        <div className="flex items-center justify-center mb-2">
          <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
            <Star className="w-4 h-4 text-primary-foreground" />
          </div>
        </div>
        <p className="text-2xl font-bold text-foreground">{score}</p>
        <p className="text-xs text-muted-foreground">Points</p>
      </Card>

      {/* Streak */}
      <Card className="p-4 gradient-card border-border/50 text-center">
        <div className="flex items-center justify-center mb-2">
          <div className="w-8 h-8 rounded-full gradient-warning flex items-center justify-center">
            <Flame className="w-4 h-4 text-warning-foreground" />
          </div>
        </div>
        <p className="text-2xl font-bold text-foreground">{streak}</p>
        <p className="text-xs text-muted-foreground">Streak</p>
      </Card>

      {/* Accuracy */}
      <Card className="p-4 gradient-card border-border/50 text-center">
        <div className="flex items-center justify-center mb-2">
          <div className="w-8 h-8 rounded-full gradient-success flex items-center justify-center">
            <Target className="w-4 h-4 text-success-foreground" />
          </div>
        </div>
        <p className="text-2xl font-bold text-foreground">{accuracy.toFixed(0)}%</p>
        <p className="text-xs text-muted-foreground">Accuracy</p>
      </Card>

      {/* Total Predictions */}
      <Card className="p-4 gradient-card border-border/50 text-center">
        <div className="flex items-center justify-center mb-2">
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
            <Trophy className="w-4 h-4 text-accent-foreground" />
          </div>
        </div>
        <p className="text-2xl font-bold text-foreground">{totalPredictions}</p>
        <p className="text-xs text-muted-foreground">Predictions</p>
      </Card>
    </div>
  );
};