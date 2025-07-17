
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import SubscriptionStatus from "@/components/SubscriptionStatus";
import { BookOpen, Users, TrendingUp, Settings, Activity, Award, Clock } from "lucide-react";
import { PointsManager } from "@/utils/pointsManager";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { learningCategories } from "@/data/learningCategories";

const DashboardPage = () => {
  const { user, loading: authLoading } = useAuth();
  const { subscribed, inTrial, subscriptionTier } = useSubscription();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [progressData, setProgressData] = useState<any>(null);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [childrenList, setChildrenList] = useState<string[]>([]);
  const [selectedChild, setSelectedChild] = useState("default");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  // Load progress data
  useEffect(() => {
    const loadDashboardData = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        // Set current child
        PointsManager.setCurrentChild(selectedChild);
        
        // Get progress data
        const progress = await PointsManager.getProgress();
        setProgressData(progress);

        // Get recent quiz results
        const { data: quizResults } = await supabase
          .from('quiz_results')
          .select('*')
          .eq('user_id', user.id)
          .eq('child_name', selectedChild)
          .order('created_at', { ascending: false })
          .limit(5);

        setRecentActivity(quizResults || []);

        // Get categories with their enabled status
        const { data: progressRows } = await supabase
          .from('progress')
          .select('*')
          .eq('user_id', user.id)
          .eq('child_name', selectedChild);

        const categoryMap = new Map();
        progressRows?.forEach(row => {
          categoryMap.set(row.category, {
            ...row,
            enabled: row.category_enabled
          });
        });

        // Get all categories from data
        const allCategories = learningCategories.map(cat => cat.name);
        const categoryList = allCategories.map(cat => ({
          name: cat,
          enabled: categoryMap.get(cat)?.enabled ?? true,
          points: categoryMap.get(cat)?.total_points ?? 0,
          activities: categoryMap.get(cat)?.activities_completed ?? 0
        }));

        setCategories(categoryList);

        // Get children list
        const { data: childrenData } = await supabase
          .from('progress')
          .select('child_name')
          .eq('user_id', user.id);

        const uniqueChildren = [...new Set(childrenData?.map(c => c.child_name) || [])];
        if (uniqueChildren.length === 0) {
          uniqueChildren.push('default');
        }
        setChildrenList(uniqueChildren);

      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadDashboardData();
    }
  }, [user, selectedChild]);

  const handleCategoryToggle = async (categoryName: string, enabled: boolean) => {
    try {
      await PointsManager.toggleCategory(categoryName, enabled);
      
      // Update local state
      setCategories(prev => 
        prev.map(cat => 
          cat.name === categoryName ? { ...cat, enabled } : cat
        )
      );

      toast({
        title: enabled ? "Kategori aktiveret" : "Kategori deaktiveret",
        description: `${categoryName} er nu ${enabled ? 'tilgængelig' : 'skjult'} for ${selectedChild}`,
      });
    } catch (error) {
      console.error('Error toggling category:', error);
      toast({
        title: "Fejl",
        description: "Kunne ikke opdatere kategori-indstillinger",
        variant: "destructive"
      });
    }
  };

  if (authLoading || loading) {
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
      title: "Samlede Point",
      value: progressData?.totalPoints?.toString() || "0",
      icon: Award,
      description: "Optjent i alt"
    },
    {
      title: "Afsluttede Aktiviteter",
      value: progressData?.activitiesCompleted?.toString() || "0",
      icon: Activity,
      description: "Gennemført"
    },
    {
      title: "Aktive Kategorier",
      value: categories.filter(c => c.enabled).length.toString(),
      icon: Users,
      description: "Tilgængelige"
    },
    {
      title: "Seneste Aktivitet",
      value: recentActivity.length > 0 ? "I dag" : "Ingen",
      icon: Clock,
      description: "Sidste aktivitet"
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

        {/* Child Selection */}
        {childrenList.length > 1 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Vælg Barn</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 flex-wrap">
                {childrenList.map(child => (
                  <Button
                    key={child}
                    variant={selectedChild === child ? "default" : "outline"}
                    onClick={() => setSelectedChild(child)}
                    size="sm"
                  >
                    {child === 'default' ? 'Standard' : child}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Category Controls */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Kategori Kontrol - {selectedChild === 'default' ? 'Standard' : selectedChild}
            </CardTitle>
            <CardDescription>
              Aktivér eller deaktivér kategorier for dit barn
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categories.map(category => (
                <div key={category.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{category.name}</h4>
                    <p className="text-sm text-gray-600">
                      {category.points} point • {category.activities} aktiviteter
                    </p>
                  </div>
                  <Switch
                    checked={category.enabled}
                    onCheckedChange={(enabled) => handleCategoryToggle(category.name, enabled)}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Seneste Aktivitet</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{activity.activity_name}</p>
                      <p className="text-sm text-gray-600">{activity.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{activity.score}/{activity.max_score}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(activity.created_at).toLocaleDateString('da-DK')}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">Ingen aktivitet endnu</p>
              )}
            </div>
          </CardContent>
        </Card>

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
