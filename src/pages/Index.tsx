import { useState, useEffect } from "react";
import { PredictionCard } from "@/components/PredictionCard";
import { GameStats } from "@/components/GameStats";
import { ResultModal } from "@/components/ResultModal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, TrendingUp, Users, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for demo - in production this would come from APIs
const MAIN_ASSETS = [
  { id: "tesla", name: "Tesla (TSLA)", currentPrice: 248.50, emoji: "🚗" },
  { id: "ethereum", name: "Ethereum (ETH)", currentPrice: 3420.75, emoji: "💎" },
];

const Index = () => {
  const [gameState, setGameState] = useState({
    score: 1250,
    streak: 3,
    correctPredictions: 8,
    totalPredictions: 12,
    timeLeft: 120, // 2 minutes for demo
    isGameActive: true,
    predictions: {} as Record<string, 'up' | 'down' | null>,
  });

  const [showResult, setShowResult] = useState(false);
  const [lastResult, setLastResult] = useState(null);
  const { toast } = useToast();

  // Timer countdown
  useEffect(() => {
    if (gameState.timeLeft > 0 && gameState.isGameActive) {
      const timer = setTimeout(() => {
        setGameState(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
      }, 1000);
      return () => clearTimeout(timer);
    } else if (gameState.timeLeft === 0) {
      // Auto-settle when time runs out
      handleTimeUp();
    }
  }, [gameState.timeLeft, gameState.isGameActive]);

  const handleTimeUp = () => {
    toast({
      title: "Time's Up! ⏰",
      description: "The prediction window has closed. Starting next round...",
    });
    
    // Reset for next round
    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        timeLeft: 120,
        isGameActive: true,
        predictions: {},
      }));
    }, 2000);
  };

  const handlePredict = (assetId: string, prediction: 'up' | 'down') => {
    const asset = MAIN_ASSETS.find(a => a.id === assetId);
    if (!asset) return;
    
    // Update predictions state
    setGameState(prev => ({
      ...prev,
      predictions: { ...prev.predictions, [assetId]: prediction }
    }));
    
    // Simulate price movement and result (in production, this would be real data)
    const priceChange = (Math.random() - 0.5) * 0.1; // Random ±5% change
    const newPrice = asset.currentPrice * (1 + priceChange);
    const actualDirection = newPrice > asset.currentPrice ? 'up' : 'down';
    const isCorrect = prediction === actualDirection;
    
    const pointsEarned = isCorrect ? 150 : 50; // More points for correct predictions
    
    const result = {
      asset: asset.name,
      prediction,
      actualDirection,
      isCorrect,
      startPrice: asset.currentPrice,
      endPrice: newPrice,
      pointsEarned,
    };

    // Update game state
    setGameState(prev => ({
      ...prev,
      score: prev.score + pointsEarned,
      streak: isCorrect ? prev.streak + 1 : 0,
      correctPredictions: prev.correctPredictions + (isCorrect ? 1 : 0),
      totalPredictions: prev.totalPredictions + 1,
    }));

    setLastResult(result);
    
    // Show result after a brief delay for suspense
    setTimeout(() => {
      setShowResult(true);
    }, 1500);

    toast({
      title: `${asset.emoji} Prediction Submitted!`,
      description: `You predicted ${asset.name} will go ${prediction.toUpperCase()}. Settlement in progress...`,
    });
  };

  const handleCloseResult = () => {
    setShowResult(false);
    setLastResult(null);
    
    // Start next round
    setGameState(prev => ({
      ...prev,
      timeLeft: 120,
      isGameActive: true,
      predictions: {},
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center shadow-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-hero bg-clip-text text-transparent">
                  Money Lab Demo
                </h1>
                <p className="text-xs text-muted-foreground">Learn investing through prediction games 🎓</p>
              </div>
            </div>
            
            <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
              <Users className="w-3 h-3 mr-1" />
              Student Mode
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Game Stats */}
        <GameStats
          score={gameState.score}
          streak={gameState.streak}
          correctPredictions={gameState.correctPredictions}
          totalPredictions={gameState.totalPredictions}
        />

        {/* Dual Prediction Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {MAIN_ASSETS.map((asset) => (
            <div key={asset.id} className="relative">
              <PredictionCard
                asset={`${asset.emoji} ${asset.name}`}
                currentPrice={asset.currentPrice}
                timeLeft={gameState.timeLeft}
                onPredict={(prediction) => handlePredict(asset.id, prediction)}
                isActive={gameState.isGameActive && !gameState.predictions[asset.id]}
                prediction={gameState.predictions[asset.id]}
              />
            </div>
          ))}
        </div>

        {/* Educational Panel */}
        <Card className="gradient-card border-border/50 p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-5 h-5 text-accent" />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">💡 Learning Mode</h3>
              <p className="text-sm text-muted-foreground">
                This is a gamified learning experience to help you understand market predictions. 
                Make predictions, learn from results, and build your financial knowledge!
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="outline" className="text-xs">🎯 Risk-Free Learning</Badge>
                <Badge variant="outline" className="text-xs">📊 Real Market Concepts</Badge>
                <Badge variant="outline" className="text-xs">🏆 Earn Points & Badges</Badge>
              </div>
            </div>
          </div>
        </Card>

        {/* Coming Soon Features */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-center text-muted-foreground">
            🚀 Coming Soon
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-4 border-dashed border-muted-foreground/20">
              <div className="text-center space-y-2">
                <TrendingUp className="w-8 h-8 text-muted-foreground/50 mx-auto" />
                <h3 className="font-medium text-muted-foreground">Portfolio Trading</h3>
                <p className="text-xs text-muted-foreground/70">
                  Unlock after 10 correct predictions
                </p>
              </div>
            </Card>
            <Card className="p-4 border-dashed border-muted-foreground/20">
              <div className="text-center space-y-2">
                <Badge className="w-8 h-8 rounded-full bg-muted-foreground/10 text-muted-foreground/50 mx-auto">
                  NFT
                </Badge>
                <h3 className="font-medium text-muted-foreground">Achievement Badges</h3>
                <p className="text-xs text-muted-foreground/70">
                  Mint NFT badges for milestones
                </p>
              </div>
            </Card>
          </div>
        </div>
      </main>

      {/* Result Modal */}
      <ResultModal
        isOpen={showResult}
        onClose={handleCloseResult}
        result={lastResult}
      />
    </div>
  );
};

export default Index;
