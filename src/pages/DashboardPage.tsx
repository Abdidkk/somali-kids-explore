
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SubscriptionStatus from "@/components/SubscriptionStatus";
import { BookOpen, Users, TrendingUp, Settings } from "lucide-react";

const DashboardPage = () => {
  const { user, loading: authLoading } = useAuth();
  const { subscribed, inTrial, subscriptionTier } = useSubscription();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Indlæser...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const stats = [
    {
      title: "Børneprofiler",
      value: subscriptionTier === "Basic" ? "5" : "Ubegrænset",
      icon: Users,
      description: "Aktive profiler"
    },
    {
      title: "Lektioner gennemført",
      value: "0",
      icon: BookOpen,
      description: "Denne måned"
    },
    {
      title: "Fremgang",
      value: "0%",
      icon: TrendingUp,
      description: "Denne uge"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Velkommen tilbage, {user.user_metadata?.name || user.email?.split('@')[0] || 'Bruger'}!
          </h1>
          <p className="text-xl text-gray-600">
            Her er din personlige dashboard
          </p>
        </div>

        {/* Subscription Status */}
        <div className="mb-8">
          <SubscriptionStatus />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Børneprofiler</CardTitle>
              <CardDescription>
                Administrer børneprofiler og se fremgang
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate('/admin-kids')}
                className="w-full bg-[#4CA6FE] hover:bg-[#3b95e9]"
              >
                <Users className="mr-2 h-4 w-4" />
                Administrer børn
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Start læring</CardTitle>
              <CardDescription>
                Gå til læringsmodulet og start lektioner
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate('/laer')}
                variant="outline"
                className="w-full"
                disabled={!subscribed && !inTrial}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                {!subscribed && !inTrial ? "Kræver abonnement" : "Start læring"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Trial/Subscription Notice */}
        {inTrial && !subscribed && (
          <Card className="mt-8 border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-blue-900">
                    Du er i din gratis prøveperiode
                  </h3>
                  <p className="text-blue-700 text-sm mt-1">
                    Vælg en plan for at fortsætte efter prøveperioden udløber.
                  </p>
                </div>
                <Button 
                  onClick={() => navigate('/choose-plan')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Vælg plan
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
